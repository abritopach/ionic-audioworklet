import { Injectable } from '@angular/core';
import { WorkerUrl } from 'worker-url';

@Injectable({
  providedIn: 'root'
})
export class AudioProcessorService {

  audioContext: AudioContext = null;
  processorNode: AudioWorkletNode;
  oscGainRange;

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
        /*
        const workletUrl = new WorkerUrl(new URL('assets/worklet/audio-processor.worklet.ts', import.meta.url), {
          name: 'worklet',
        });
        await this.audioContext.audioWorklet.addModule(workletUrl);
        */
        console.log('adding...');
        await this.audioContext.audioWorklet.addModule('assets/worklet/audio-processor.worklet.js');
        this.processorNode = new AudioWorkletNode(this.audioContext, 'my-audio-processor');
        console.log('processorNode', this.processorNode);
      } catch(error) {
        console.error(`** Error: Unable to create worklet node: ${e}`);
        return null;
      }
    }
    await this.audioContext.resume();
    console.log('after audioContext resume');
    return this.processorNode;
  }

  async audioDemoStart() {
    const audioProcessorNode = await this.createMyAudioProcessor();
    if (!audioProcessorNode) {
      console.log('** Error: unable to create audio processor');
      return;
    }
    const soundSource = new OscillatorNode(this.audioContext);
    const gainNode = this.audioContext.createGain();

    // Configure the oscillator node
    soundSource.type = 'square';
    soundSource.frequency.setValueAtTime(440, this.audioContext.currentTime); // (A4)
    // Configure the gain for the oscillator
    gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
    // Connect and start
    soundSource.connect(gainNode).connect(audioProcessorNode).connect(this.audioContext.destination);
    soundSource.start();
  }

  async toggleSound() {
    if (!this.audioContext) {
      console.log('toggleSound audio demo start');
      this.audioDemoStart();
    } else {
      await this.audioContext.close();
      this.audioContext = null;
    }
  }

}
