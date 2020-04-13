import { EventEmitter, Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';

declare var MediaRecorder: any;

@Injectable({
  providedIn: 'root'
})
export class NgAudioRecorderService {
  get recorderState(): RecorderState {
    return this._recorderState;
  }

  private chunks: Array<any> = [];
  protected recorderEnded = new EventEmitter();
  recorderError = new EventEmitter<ErrorCase>();
  // tslint:disable-next-line
  private _recorderState = RecorderState.INITIALIZING;

  constructor() {
  }

  private recorder: any;


  private static getUserConsent() {
    return navigator.mediaDevices.getUserMedia({audio: true});
  }

  startRecording() {
    if (this._recorderState === RecorderState.RECORDING) {
      this.recorderError.emit(ErrorCase.ALREADY_RECORDING);
    }
    if (this._recorderState === RecorderState.PAUSED) {
      this.resume();
      return;
    }
    this._recorderState = RecorderState.INITIALIZING;
    NgAudioRecorderService.getUserConsent().then((mediaStream) => {
      this.recorder = new MediaRecorder(mediaStream);
      this._recorderState = RecorderState.INITIALIZED;
      this.addListeners();
      this.recorder.start();
      this._recorderState = RecorderState.RECORDING;
    });
  }

  resume() {
    if (this._recorderState === RecorderState.PAUSED) {
      this._recorderState = RecorderState.RECORDING;
      this.recorder.resume();
    }
  }


  stopRecording(outputFormat: OutputFormat) {
    this._recorderState = RecorderState.STOPPING;
    return new Promise((resolve, reject) => {
      this.recorderEnded.pipe(timeout(2000)).subscribe((blob) => {
        this._recorderState = RecorderState.STOPPED;
        if (outputFormat === OutputFormat.BLOB) {
          resolve(blob);
        }
        if (outputFormat === OutputFormat.WEBM_BLOB_URL) {
          const audioURL = URL.createObjectURL(blob);
          resolve(audioURL);
        }
      }, _ => {
        this.recorderError.emit(ErrorCase.RECORDER_TIMEOUT);
        reject(ErrorCase.RECORDER_TIMEOUT);
      });
      this.recorder.stop();
    }).catch(() => {
      this.recorderError.emit(ErrorCase.USER_CONSENT_FAILED);
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
  WEBM_BLOB_URL,
  BLOB,
}

export enum ErrorCase {
  USER_CONSENT_FAILED,
  RECORDER_TIMEOUT,
  ALREADY_RECORDING
}

export enum RecorderState {
  INITIALIZING,
  INITIALIZED,
  RECORDING,
  PAUSED,
  STOPPING,
  STOPPED
}
