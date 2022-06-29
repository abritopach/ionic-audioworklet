import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioProcessorService {

  audioContext: AudioContext = null;
  processorNode: AudioWorkletNode;

  constructor() { }

  async createMyAudioProcessor() {
    if (!this.audioContext) {
      try {
        this.audioContext = new AudioContext();
      } catch(e) {
        console.error('** Error: Unable to create audio context');
        return null;
      }
    }
    try {
      this.processorNode = new AudioWorkletNode(this.audioContext, 'audio-processor');
    } catch(e) {
      try {
        await this.audioContext.audioWorklet.addModule('worklet/audio-processor.worklet.ts');
        this.processorNode = new AudioWorkletNode(this.audioContext, 'audio-processor');
      } catch(error) {
        console.error(`** Error: Unable to create worklet node: ${e}`);
        return null;
      }
    }
    await this.audioContext.resume();
    return this.processorNode;
  }

}
