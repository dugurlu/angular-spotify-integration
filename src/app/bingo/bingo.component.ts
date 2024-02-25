import { Component } from '@angular/core';
import { PlayListItem, PlaylistService } from '../playlist/playlist.service';
import { map, Observable, of } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-bingo',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        AsyncPipe
    ],
  templateUrl: './bingo.component.html',
  styleUrl: './bingo.component.scss'
})
export class BingoComponent {

    playlists$: Observable<Array<PlayListItem>> = of([]);

    constructor(private playlistService: PlaylistService) {
    }
    getPlaylists() {
        this.playlists$ = this.playlistService.getPlaylists().pipe(
            map(playlistResponse => playlistResponse.items)
        );
    }
}
