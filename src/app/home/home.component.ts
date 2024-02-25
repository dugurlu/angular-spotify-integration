import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { AuthService } from '../auth/auth.service';
import { Observable, of } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterLink,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        NgIf
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    isAuthenticated = false;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
        authService.isAuthenticated$.subscribe(result => this.isAuthenticated = result);
    }

    login = () => {
        this.authService.login(this.router.url);
    }
}
