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


export interface PlayListResponse {
    name: string;
    owner: string;
    public: boolean;
    total: number;
    limit: number;
    offset: number;
    previous: string;
    next: string;
    items: Array<PlayListItem>;
}

export interface PlayListItem {
    id: string;
    name: string;
    owner: User;
    description: string;
    collaborative: boolean;
    images: Array<ImageObject>;
}

export interface User {
    id: string;
    display_name: string;
}

export interface ImageObject {
    url: string;
    height: number;
    width: number;
}