import { Injectable } from '@nestjs/common';
import { TextToSpeechPort } from './ports/tts.port';
import { AudioStoragePort } from './ports/audio-storage.port';
import { generateAudioResponseSchema } from '@deep-read/types/lib/deep-read/tts';
import type { GenerateAudioResponse } from '@deep-read/types/lib/deep-read/tts';
import { AudioRecordsService } from '../audio-records/audio-records.service';

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
