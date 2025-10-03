export interface UploadAudioResponse {
  audioUrl: string;
  storagePath: string;
  expiresAt: Date;
}
export type GenerateAudioResponse = Pick<UploadAudioResponse, 'audioUrl'>;

export abstract class AudioStoragePort {
  abstract uploadAudio(
    buffer: Buffer,
    text: string,
  ): Promise<UploadAudioResponse>;
}
