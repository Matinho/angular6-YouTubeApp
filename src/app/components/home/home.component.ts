import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos: any = [];
  videoSeleccionado: any;

  constructor( public _youtubeService: YoutubeService) {

    this._youtubeService.getVideos()
                          .subscribe( resp => this.videos = resp);
   }

  ngOnInit() {
  }

  verVideo( video: any ) {
    this.videoSeleccionado = video;
    $('#myModal').modal();
  }

  cerrarModal() {
    this.videoSeleccionado = null;
    $('#myModal').modal('hide');
  }

  cargarMas() {
    this._youtubeService.getVideos()
    .subscribe( videos => this.videos.push.apply( this.videos, videos ) );
  }

}
