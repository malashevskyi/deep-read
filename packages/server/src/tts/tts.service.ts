import { Injectable } from '@nestjs/common';
import { TextToSpeechPort } from './ports/tts.port';
import {
  AudioStoragePort,
  GenerateAudioResponse,
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

  async generateAndUploadAudio(text: string): Promise<GenerateAudioResponse> {
    const audioBuffer = await this.ttsPort.generateAudioBuffer(text);

    const { audioUrl, storagePath } = await this.audioStoragePort.uploadAudio(
      audioBuffer,
      text,
    );
  }
}
