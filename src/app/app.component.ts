import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth/auth.config';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, AsyncPipe, JsonPipe, MatDrawerContainer, MatDrawer],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'spotify-bingo';

    constructor(private oauthService: OAuthService) {

    }
}
