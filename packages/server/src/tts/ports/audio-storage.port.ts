export interface GenerateAudioResponse {
  audioUrl: string;
  storagePath: string;
}

export abstract class AudioStoragePort {
  abstract uploadAudio(
    buffer: Buffer,
    text: string,
  ): Promise<GenerateAudioResponse>;
}
