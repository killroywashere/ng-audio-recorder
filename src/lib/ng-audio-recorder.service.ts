import { EventEmitter, Injectable } from '@angular/core';

declare var MediaRecorder: any;

@Injectable({
  providedIn: 'root'
})
export class NgAudioRecorderService {
  private chunks: Array<any> = [];
  protected recorderEnded = new EventEmitter();

  constructor() {
  }

  private recorder: any;

  private static getUserConsent() {
    return navigator.mediaDevices.getUserMedia({audio: true});
  }

  startRecording() {
    NgAudioRecorderService.getUserConsent().then((mediaStream) => {
      this.recorder = new MediaRecorder(mediaStream);
      this.addListeners();
      this.recorder.start();
    });
  }


  stopRecording(outputFormat: OutputFormat) {
    return new Promise((resolve, reject) => {
      this.recorderEnded.subscribe((blob) => {
        if (outputFormat === OutputFormat.BLOB) {
          resolve(blob);
        }
        if (outputFormat === OutputFormat.BLOB_URL) {
          const audioURL = URL.createObjectURL(blob);
          resolve(audioURL);
        }
      });
      this.recorder.stop();
    });
  }

  private addListeners() {
    this.recorder.ondataavailable = this.appendToChunks;
    this.recorder.onstop = this.recordingStopped;
  }

  appendToChunks = (event: any) => {
    this.chunks.push(event.data);
  }

  recordingStopped = (event: any) => {
    const blob = new Blob(this.chunks, {type: 'audio/webm'});
    this.chunks = [];
    this.recorderEnded.emit(blob);
    this.clear();
  }

  private clear() {
    this.recorder = null;
    this.chunks = [];
  }
}


export enum OutputFormat {
  BLOB_URL,
  BLOB,
}
