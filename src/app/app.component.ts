import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, JsonPipe, NgIf, NgOptimizedImage } from '@angular/common';
import {
    MatDrawer,
    MatDrawerContainer,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { AuthService } from './auth/auth.service';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, AsyncPipe, JsonPipe, MatDrawerContainer, MatDrawer, MatToolbar, MatSidenavContent, MatSidenavContainer, MatSidenav, MatButton, RouterLink, NgOptimizedImage, MatList, MatListItem, NgIf],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'Spotify Bingo';

    options = {
        fixed: false,
        top: 0,
        bottom: 0,
    };

    isAuthenticated$: Observable<boolean> = of(false);

    @ViewChild('sidenav') sidenav!: MatSidenav;

    constructor(private authService: AuthService) {
        this.isAuthenticated$ = authService.isAuthenticated$;
    }
}
