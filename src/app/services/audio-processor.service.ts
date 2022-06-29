import { Injectable } from '@angular/core';
import { WorkerUrl } from 'worker-url';

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
      this.processorNode = new AudioWorkletNode(this.audioContext, 'my-audio-processor');
    } catch(e) {
      try {
        const workletUrl = new WorkerUrl(new URL('../worklet/audio-processor.worklet.ts', import.meta.url), {
          name: 'worklet',
        });
        await this.audioContext.audioWorklet.addModule(workletUrl);
        this.processorNode = new AudioWorkletNode(this.audioContext, 'my-audio-processor');
      } catch(error) {
        console.error(`** Error: Unable to create worklet node: ${e}`);
        return null;
      }
    }
    await this.audioContext.resume();
    return this.processorNode;
  }

}
