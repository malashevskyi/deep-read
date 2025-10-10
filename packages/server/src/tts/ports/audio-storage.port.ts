import { UploadAudioResponse } from '../schemas/upload-audio.response.schema';

export abstract class AudioStoragePort {
  abstract uploadAudio(
    buffer: Buffer,
    text: string,
  ): Promise<UploadAudioResponse>;
}
