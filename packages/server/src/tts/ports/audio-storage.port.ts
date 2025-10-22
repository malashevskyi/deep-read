import type { UploadAudioResponse } from '@deep-read/types/deep-read/tts/index.js';

export abstract class AudioStoragePort {
  abstract uploadAudio(
    buffer: Buffer,
    text: string,
  ): Promise<UploadAudioResponse>;
}
