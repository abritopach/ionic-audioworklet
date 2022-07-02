import { Component } from '@angular/core';
import { RangeCustomEvent } from '@ionic/angular';
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

  pinFormatter(value: number) {
    return `${value}`;
  }

  onOscillatorGainChange(ev: Event) {
    console.log('onOscillatorGainChange', (ev as RangeCustomEvent).detail.value);
  }

  onHissGainChange(ev: Event) {
    console.log('onOscillatorGainChange', (ev as RangeCustomEvent).detail.value);
  }

}
