import { PlayListItem, PlaylistService } from '../playlist/playlist.service';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from '@angular/material/card';
import { PlaylistComponent } from '../playlist/playlist.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Component } from '@angular/core';

@Component({
    selector: 'app-bingo',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        AsyncPipe,
        MatCard,
        MatCardHeader,
        MatCardImage,
        MatCardTitle,
        NgOptimizedImage,
        MatCardContent,
        PlaylistComponent,
        MatProgressSpinner
    ],
    templateUrl: './bingo.component.html',
    styleUrl: './bingo.component.scss'
})
export class BingoComponent {

    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    playlists$: Observable<Array<PlayListItem>> = of([]);

    constructor(private playlistService: PlaylistService) {
        this.getPlaylists();
    }

    getPlaylists() {
        this.loading$.next(true);
        this.playlists$ = this.playlistService.getPlaylists().pipe(
            map(playlistResponse => playlistResponse.items),
            tap(_ => this.loading$.next(false)),
            catchError(_ => {
                this.loading$.next(false);
                return of([]);
            })
        );
    }
}
