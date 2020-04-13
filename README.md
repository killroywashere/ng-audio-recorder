# NgAudioRecorder
Audio Recorder Service for Angular2+ Applications

**Features**
 - Uses Media Recorder API
 - Supports pause & resume
 - **1KB** minified and gzipped
 - Exports as WEBM audio Blob or WEBM audio blob URL

## Installation

To add the Audio recorder to your Angular project:
```
npm i ng-audio-recorder
```

Once installed, add the Progressive Loader to your `app.module.ts`:
```typescript
import { NgAudioRecorderModule } from 'ng-audio-recorder';

...

@NgModule({
   ...
   imports: [
     ...
     NgAudioRecorderModule,
    ...
   ],
   ...
});
export class AppModule {}
```


## Sample usage

Now you can use the Progressive loader component in your app components, for example in `app.component.ts`:
```typescript
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';
...

@Component({...})
export class AppComponent {

    constructor(private audioRecorderService: NgAudioRecorderService) {
    
        this.audioRecorderService.recorderError.subscribe(recorderErrorCase => {
            // Handle Error
        })
    }
    
    startRecording() {
        this.audioRecorderService.startRecording();
    }
    
    stopRecording() {
         this.audioRecorderService.stopRecording(outputFormat).then((output) => {
            // do post output steps
         }).catch(errrorCase => {
             // Handle Error
         });
    }
}
```

## Output Formats
|Name| Description|
|---|--------|
| **OutputFormat.WEBM_BLOB** | Webm Blob for the recorded audio |
| **OutputFormat.WEBM_BLOB_URL** | Webm Blob URL for the recorded audio |

## Error Cases
|Name| Description|
|---|--------|
| **ErrorCase.USER_CONSENT_FAILED** | If user denies audio access or if the website is accessed on http instead of https |
| **ErrorCase.ALREADY_RECORDING** | If you call start recording and state is RECORDING |


## Audio Recorder State
|Name| Description|
|---|--------|
| **RecorderState.INITIALIZING** | State before calling mediarecorder record API and user consent |
| **RecorderState.INITIALIZED** | On user consent successful |
| **RecorderState.RECORDING** | When Recording is in progress |
| **RecorderState.PAUSED** | On pausing the recording |
| **RecorderState.STOPPING** | After calling stopped and before promise return |
| **RecorderState.STOPPED** | On successful stop of media recorder |

## Methods
|Name|Input Type|Return Type | Description|
|---|---|---|-----|
| **startRecording** | - | - | Gets the consent and starts recording or resumes if paused |
| **stopRecording** | `OutputFormat` | `Promise` | If successful, output will be desired output,  if rejected, `ErrorCase` will be returned |
| **getRecorderState** | - | `RecorderState` | Returns the current state of recorder |
| **pause** | - | - | Pauses the current recording |
| **resume** | - | - | Resumes the paused recording |
| **getUserConsent** | - | `Promise` | Resolves if user allows, rejects if link is not secure or user rejects |

## Events
|Event| OutputData| Description
|---|--------|---|
| **recorderError** | ErrorCase | Emits Event in case of error


## Further help / Suggestions
Contact me at `kishinkarra@gmail.com`
