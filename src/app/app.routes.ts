import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { BingoComponent } from './bingo/bingo.component';

export const routes: Routes = [
    {path: 'home', loadComponent: () => import('./home/home.component').then(mod => mod.HomeComponent)},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login', loadComponent: () => import('./login/login.component').then(mod => mod.LoginComponent)},
    {
        path: 'bingo',
        component: BingoComponent,
        // loadComponent: () => import('./bingo/bingo.component').then(mod => mod.BingoComponent),
        canActivate: [authGuard]
    },
];
