export interface UploadAudioResponse {
  audioUrl: string;
  storagePath: string;
  expiresAt: string;
}
export type GenerateAudioResponse = Pick<UploadAudioResponse, 'audioUrl'>;

export abstract class AudioStoragePort {
  abstract uploadAudio(
    buffer: Buffer,
    text: string,
  ): Promise<UploadAudioResponse>;
}
