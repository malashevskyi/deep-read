import { Injectable } from '@nestjs/common';
import { TextToSpeechPort } from './ports/tts.port';
import {
  AudioStoragePort,
  GenerateAudioResponse,
} from './ports/audio-storage.port';
import { AudioRecordsService } from '@/audio-records/audio-records.service';

@Injectable()
export class TtsService {
  constructor(
    private readonly ttsPort: TextToSpeechPort,
    private readonly audioStoragePort: AudioStoragePort,
    private readonly audioRecordsService: AudioRecordsService,
  ) {}

  async generateAndUploadAudio(text: string): Promise<GenerateAudioResponse> {
    const audioBuffer = await this.ttsPort.generateAudioBuffer(text);

    const { audioUrl, storagePath } = await this.audioStoragePort.uploadAudio(
      audioBuffer,
      text,
    );

    await this.audioRecordsService.createAudioRecord({
      id: text,
      audioUrl: audioUrl,
      storagePath: storagePath,
    });

    return { audioUrl, storagePath };
  }
}
