import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class YoutubeService {

  private youtubeURL = 'https://www.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyDwb3J7_xD_JQqsCnJU8lHlF5iCy4I6yLU';
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor( public http: Http ) { }

  getVideos() {

    const url = `${ this.youtubeURL }/playlistItems`;
    const params = new URLSearchParams();

    params.set( 'part', 'snippet' );
    params.set( 'maxResults', '20' );
    params.set( 'playlistId', this.playlist );
    params.set( 'key', this.apikey );

    if ( this.nextPageToken ) {
      params.set( 'PageToken', this.nextPageToken );
    }

    return this.http.get( url, { search: params } )
                      .pipe( map( resp => {
                                          this.nextPageToken = resp.json().nextPageToken;
                                          console.log(this.nextPageToken);
                                          resp = resp.json().items.map((video) => video.snippet);
                                          console.log(resp);
                                          return resp;
                                         } ) );

  }
}
