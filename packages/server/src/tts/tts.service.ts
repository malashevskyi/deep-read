import { Injectable } from '@nestjs/common';
import { TextToSpeechPort } from './ports/tts.port';
import {
  AudioStoragePort,
  TextToSpeechResult,
} from './ports/audio-storage.port';
import { ErrorService } from '@/errors/errors.service';
import { AppErrorCode } from '@/shared/exceptions/AppErrorCode';

@Injectable()
export class TtsService {
  constructor(
    private readonly ttsPort: TextToSpeechPort,
    private readonly audioStoragePort: AudioStoragePort,
    private readonly errorService: ErrorService,
  ) {}

  async generateAndUploadAudio(text: string): Promise<TextToSpeechResult> {
    let audioBuffer: Buffer;

    try {
      audioBuffer = await this.ttsPort.generateAudioBuffer(text);
    } catch (error) {
      this.errorService.handle(
        AppErrorCode.TTS_GENERATION_FAILED,
        `Failed to generate audio for text: "${text}"`,
        error,
      );
    }
    try {
      return await this.audioStoragePort.uploadAudio(audioBuffer, text);
    } catch (error) {
      this.errorService.handle(
        AppErrorCode.AUDIO_UPLOAD_FAILED,
        `Failed to upload audio to storage for text: "${text}"`,
        error,
      );
    }
  }
}
