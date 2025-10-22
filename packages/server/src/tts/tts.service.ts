import { Injectable } from '@nestjs/common';
import { generateAudioResponseSchema } from '@malashevsky/types/deep-read/tts/index.js';
import type { GenerateAudioResponse } from '@malashevsky/types/deep-read/tts/index.js';
import { TextToSpeechPort } from './ports/tts.port.js';
import { AudioStoragePort } from './ports/audio-storage.port.js';
import { AudioRecordsService } from '../audio-records/audio-records.service.js';

@Injectable()
export class TtsService {
  constructor(
    private readonly ttsPort: TextToSpeechPort,
    private readonly audioStoragePort: AudioStoragePort,
    private readonly audioRecordsService: AudioRecordsService,
  ) {}

  async generateAndUploadAudio(text: string): Promise<GenerateAudioResponse> {
    const audioBuffer = await this.ttsPort.generateAudioBuffer(text);

    const { audioUrl, storagePath, expiresAt } =
      await this.audioStoragePort.uploadAudio(audioBuffer, text);

    await this.audioRecordsService.createAudioRecord({
      id: text,
      audioUrl: audioUrl,
      storagePath: storagePath,
      audioUrlExpiresAt: expiresAt,
      // No associated dictionary entry at creation
      dictionaryEntryId: null,
    });

    return generateAudioResponseSchema.parse({ audioUrl });
  }
}
