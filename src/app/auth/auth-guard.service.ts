import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { filter, Observable, switchMap, tap } from 'rxjs';

@Injectable()
export class AuthGuardService {

    constructor(private authService: AuthService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> {
        return this.authService.isDoneLoading$.pipe(
            filter(isDone => isDone),
            switchMap(_ => this.authService.isAuthenticated$),
            tap(isAuthenticated => isAuthenticated || this.authService.login(state.url))
        );
    }
}
