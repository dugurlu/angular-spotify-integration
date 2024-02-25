import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { filter, of, switchMap, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isDoneLoading$.pipe(
        filter(isDone => isDone),
        switchMap(_ => authService.isAuthenticated$),
        tap(isAuthenticated => {
            if(isAuthenticated){
                return of(true);
            }

            return router.navigateByUrl('/login').then(result => of(false));
        })
    );
};
