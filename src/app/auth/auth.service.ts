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
            this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());

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

        this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());

        this.oauthService.events.pipe(filter(e => ['token_received'].includes(e.type)))
            .subscribe(e => console.log('token received'));


    }

    public runInitialLoginSequence = (): Promise<void> => {
        if (location.hash) {
            console.log('Encountered hash fragment, plotting as table...');
            console.table(location.hash.substring(1).split('&').map(kvp => kvp.split('=')));
        }

        return this.oauthService.tryLoginCodeFlow().then((event) => {
            console.log('trylogin', event);
            // if (!this.oauthService.hasValidAccessToken()) {
            //     console.log('valid access token?', this.oauthService.hasValidAccessToken());
            //     return this.oauthService.silentRefresh();
            // }
            return new Promise((resolve) => {
                resolve(event);
            });
        }).then(() => {
            this.isDoneLoadingSubject$.next(true);
        });
    }

    public login = (targetUrl?: string): void => {
        console.log('logging in from', targetUrl);
        this.oauthService.initCodeFlow(targetUrl || this.router.url);
    }
}
