import { TestBed } from '@angular/core/testing';

import { NgAudioRecorderService } from './ng-audio-recorder.service';

describe('NgAudioRecorderService', () => {
  let service: NgAudioRecorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgAudioRecorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
