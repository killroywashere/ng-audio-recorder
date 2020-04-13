import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAudioRecorderComponent } from './ng-audio-recorder.component';

describe('NgAudioRecorderComponent', () => {
  let component: NgAudioRecorderComponent;
  let fixture: ComponentFixture<NgAudioRecorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgAudioRecorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAudioRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
