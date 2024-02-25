import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-playlist',
  standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        NgIf
    ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {

    @Input() imageUrl: string = '';
    @Input() title: string = '';
    @Input() owner: string = '';
}
