import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../auth/auth.service';

const SPOTIFY_LOGO = '../assets/spotify_logo.svg';
const SPOTIFY_ICON = '../assets/spotify_icon.svg';


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

    constructor(private authService: AuthService) {
    }

    login = () => {
        this.authService.login();
    }

}
