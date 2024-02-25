import { Injectable } from '@angular/core';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, map, Observable } from 'rxjs';
import { authConfig } from './auth.config';

@Injectable({providedIn: 'root'})
export class AuthService {
    private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

    private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);
    public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

    public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
        this.isAuthenticated$,
        this.isDoneLoading$
    ]).pipe(map(values => values.every(b => b)));

    constructor(
        private oauthService: OAuthService,
        private router: Router,
    ) {
        this.oauthService.configure(authConfig);
        this.oauthService.setupAutomaticSilentRefresh();

        this.oauthService.events.subscribe(event => {
            if (event instanceof OAuthErrorEvent) {
                console.error('OAuthErrorEvent Object:', event);
            } else {
                console.warn('OAuthEvent Object:', event);
            }
        });

        window.addEventListener('storage', (event) => {
            // The `key` is `null` if the event was caused by `.clear()`
            if (event.key !== 'access_token' && event.key !== null) {
                return;
            }

            console.warn('Noticed changes to access_token (most likely from another tab), updating isAuthenticated');
            this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());

        });

        this.oauthService.events.subscribe(_ => {
            this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
        });
        this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());

        this.oauthService.events.pipe(filter(e => ['token_received'].includes(e.type)))
            .subscribe(e => this.oauthService.loadUserProfile());

        this.oauthService.tryLogin().then((event) => {
            if (!this.oauthService.hasValidAccessToken()) {
                return this.oauthService.silentRefresh();
            }
            return new Promise((resolve) => {
                resolve(event);
            });
        }).then(() => {
            if (this.oauthService.getIdentityClaims()) {
                console.log('claims', this.oauthService.getIdentityClaims());
            }
        })


    }

    public runInitialLoginSequence = (): Promise<void> => {
        console.log('initial login');
        if (location.hash) {
            console.log('Encountered hash fragment, plotting as table...');
            console.table(location.hash.substring(1).split('&').map(kvp => kvp.split('=')));
        }


        // 0. LOAD CONFIG:
        // First we have to check to see how the IdServer is
        // currently configured:
        return this.oauthService.loadDiscoveryDocumentAndTryLogin()

            .then(() => {
                console.log('after login');
                if (this.oauthService.hasValidAccessToken()) {
                    console.log('valid token', this.oauthService.getAccessToken());
                    return Promise.resolve();
                }

                // 2. SILENT LOGIN:
                // Try to log in via a refresh because then we can prevent
                // needing to redirect the user:
                return this.oauthService.silentRefresh()
                    .then(() => Promise.resolve())
                    .catch(result => {
                        // Subset of situations from https://openid.net/specs/openid-connect-core-1_0.html#AuthError
                        // Only the ones where it's reasonably sure that sending the
                        // user to the IdServer will help.
                        const errorResponsesRequiringUserInteraction = [
                            'interaction_required',
                            'login_required',
                            'account_selection_required',
                            'consent_required',
                        ];

                        if (result
                            && result.reason
                            && errorResponsesRequiringUserInteraction.indexOf(result.reason.error) >= 0) {

                            // 3. ASK FOR LOGIN:
                            // At this point we know for sure that we have to ask the
                            // user to log in, so we redirect them to the IdServer to
                            // enter credentials.
                            //
                            // Enable this to ALWAYS force a user to login.
                            // this.login();
                            //
                            // Instead, we'll now do this:
                            console.warn('User interaction is needed to log in, we will wait for the user to manually log in.');
                            return Promise.resolve();
                        }

                        // We can't handle the truth, just pass on the problem to the
                        // next handler.
                        return Promise.reject(result);
                    });
            })

            .then(() => {
                this.isDoneLoadingSubject$.next(true);

                // Check for the strings 'undefined' and 'null' just to be sure. Our current
                // login(...) should never have this, but in case someone ever calls
                // initImplicitFlow(undefined | null) this could happen.
                if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
                    let stateUrl = this.oauthService.state;
                    if (!stateUrl.startsWith('/')) {
                        stateUrl = decodeURIComponent(stateUrl);
                    }
                    console.log(`There was state of ${this.oauthService.state}, so we are sending you to: ${stateUrl}`);
                    this.router.navigateByUrl(stateUrl);
                }
            })
            .catch(() => this.isDoneLoadingSubject$.next(true));
    }

    public login = (targetUrl?: string) => {
        console.log('trying login');
        this.oauthService.initLoginFlow(targetUrl || this.router.url);
    }

    public login2 = (targetUrl?: string) => {
        this.oauthService.loadDiscoveryDocumentAndLogin({state: targetUrl || this.router.url})
            .then(res => {
                let stateUrl = this.oauthService.state;
                if (stateUrl) {
                    if (!stateUrl.startsWith('/')) {
                        stateUrl = decodeURIComponent(stateUrl);
                    }
                    this.router.navigateByUrl(stateUrl);
                }
            })
    }

    private navigateToLoginPage() {
        // TODO: Remember current URL
        this.router.navigateByUrl('/login');
    }
}
