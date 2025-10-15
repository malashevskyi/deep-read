import type { UploadAudioResponse } from '@deep-read/types/lib/deep-read/tts';

export abstract class AudioStoragePort {
  abstract uploadAudio(
    buffer: Buffer,
    text: string,
  ): Promise<UploadAudioResponse>;
}
