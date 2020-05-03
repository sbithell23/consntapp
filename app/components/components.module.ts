import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AudioPlayerComponent } from '../components/audio-player/audio-player.component';
import { VideoComponent } from './video/video.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [AudioPlayerComponent, VideoComponent],
    imports: [IonicModule, CommonModule, FormsModule],
    exports: [AudioPlayerComponent, VideoComponent]
})
export class ComponentsModule { }
