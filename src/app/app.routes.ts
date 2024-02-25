import { Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

export const routes: Routes = [
    {path: 'home', loadComponent: () => import('./home/home.component').then(mod => mod.HomeComponent)},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login', loadComponent: () => import('./login/login.component').then(mod => mod.LoginComponent)},
    {
        path: 'bingo',
        loadComponent: () => import('./bingo/bingo.component').then(mod => mod.BingoComponent),
        canActivate: [AuthGuardService]
    },
];
