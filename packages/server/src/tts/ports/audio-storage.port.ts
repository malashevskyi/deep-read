import { AnalysisResponse } from '@/types';

export type TextToSpeechResult = Pick<
  AnalysisResponse['word'],
  'audioUrl' | 'storagePath'
>;

export abstract class AudioStoragePort {
  abstract uploadAudio(
    buffer: Buffer,
    text: string,
  ): Promise<TextToSpeechResult>;
}
