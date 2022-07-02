import { Component } from '@angular/core';
import { AudioProcessorService } from '../services/audio-processor.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private audioProcessorService: AudioProcessorService) {}

  toggleSound() {
    this.audioProcessorService.toggleSound();
  }

}
