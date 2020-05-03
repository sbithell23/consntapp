import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var Playerjs: any;
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements AfterViewInit {
  @ViewChild('video1', { static: true }) videoPlayer: ElementRef;
  @Input() videoString: string;
  id: string;
  isVideoPlayed: boolean = false;
  constructor(
  ) { }

  ngAfterViewInit() {
    if (this.videoString) {
      // this.videoPlayer.nativeElement.src = this.videoString + "#t=0.1";
      this.prepareVideo(this.videoString);
    }
  }

  player
  prepareVideo(url?: string) {
    this.id = 'video';   //'id' + (new Date).getTime();
    // url = url + "#t=0.2";
    this.player = new Playerjs({ id: this.id, file: url, seek: '0.01', time: '0.01' });
  }

  // ready: this.PlayerReady(),
  PlayerReady() {
    setTimeout(() => {
      console.log('function event lister call');
      setTimeout(() => {
        console.log('pause video');
        this.player.api("pause");
      }, 2000);
    }, 1000);
  }

}
