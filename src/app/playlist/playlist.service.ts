import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) {
  }

  getPlaylists(): Observable<PlayListResponse> {
      return this.http.get<PlayListResponse>(`https://api.spotify.com/v1/me/playlists`)
  }
}


export interface PlayListItem {
    collaborative: boolean;
    id: string;
    description: string;
    name: string;
}

export interface PlayListResponse {
    items: Array<PlayListItem>;
}
