import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {
  @Input() audioURL: string;
  @Input() time: string = '';
  @Input()base64: string;
  interval: any;
  audioFile: MediaObject;
  audio: { isAudioPlaying: boolean, audioDuration: any, currentAudioPosition: any, totalTime: any } = {
    isAudioPlaying: false,
    audioDuration: 0,
    currentAudioPosition: 0,
    totalTime: 0
  }

  constructor(
    private media: Media,
    private cdf: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.createAudioFile();
  }

  ngOnDestroy() {
    if (this.audioFile) {
      this.audioFile.stop();
      this.audioFile.release();
    }
  }

  createAudioFile() {
    this.audioFile = this.media.create(this.audioURL);
    this.getFileDuration();
    this.cdf.detectChanges();
  }

  playpauseAudio() {
    if (this.audio.isAudioPlaying) {
      this.audioFile.stop();
      this.clearInterval();
    }
    else {
      this.audioFile.play();
      this.audioFile.seekTo(this.audio.currentAudioPosition);
      this.interval = setInterval(() => {
        this.audio.currentAudioPosition += 0.1;
        if (this.audio.currentAudioPosition >= this.audio.audioDuration) {
          this.clearInterval();
          this.audio.isAudioPlaying = false;
          this.audio.currentAudioPosition = 0;
          this.audioFile.release();
        }
      }, 100);
    }
    this.audio.isAudioPlaying = !this.audio.isAudioPlaying;
  }

  clearInterval() {
    clearInterval(this.interval);
  }

  getFileDuration() {
    // this.audioFile.prepareAudio().then((duration) => {
    //   console.log('after prepare');
    //   this.audio.audioDuration = duration;
    //   this.convertSecondsToTime();
    // });

    this.getDuration(this.base64, (length) => {
      this.audio.audioDuration = length;
      this.convertSecondsToTime();
    });
  }

  getDuration(src, cb) {
    var audio = new Audio();
    $(audio).on("loadedmetadata", function () {
      cb(audio.duration);
    });
    audio.src = src;
  }



  convertSecondsToTime() {
    let duration = Math.floor(this.audio.audioDuration);
    var minutes = Math.floor(duration / 60);
    var seconds = Math.floor(duration - minutes * 60);
    this.audio.totalTime = (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
  }

  changeAudioPosition() {
    if (this.audio.isAudioPlaying) {
      let inMilliseconds = this.audio.currentAudioPosition * 1000;
      this.audioFile.seekTo(inMilliseconds);
    }
  }

}
