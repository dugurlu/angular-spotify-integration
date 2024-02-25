import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        MatCardContent,
        MatCardTitle,
        MatCardHeader,
        MatCard,
        MatFabButton,
        MatIcon,
        MatIconButton,
        NgOptimizedImage,
        MatButton,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
    }

    login = () => {
        this.authService.login(this.router.url);
    }

}
