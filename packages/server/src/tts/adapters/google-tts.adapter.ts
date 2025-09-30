import { Injectable, OnModuleInit } from '@nestjs/common';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { TextToSpeechPort } from '../ports/tts.port';
import { ConfigService } from '@nestjs/config';

const AUDIO_ENCODING = 'MP3' as const;

enum LanguageCodeMap {
  en = 'en-US',
}
enum VoiceNameMap {
  en = 'en-US-Standard-C',
}

@Injectable()
export class GoogleTtsAdapter implements OnModuleInit, TextToSpeechPort {
  private ttsClient: TextToSpeechClient;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const credentialsJson = this.configService.get<string>(
      'GOOGLE_CREDENTIALS_JSON',
    );

    if (!credentialsJson) {
      throw new Error('GOOGLE_CREDENTIALS_JSON is not configured.');
    }
    const credentials = JSON.parse(credentialsJson);

    this.ttsClient = new TextToSpeechClient({ credentials });
  }

  async generateAudioBuffer(text: string): Promise<Buffer> {
    const [ttsResponse] = await this.ttsClient.synthesizeSpeech({
      input: { text },
      voice: { languageCode: LanguageCodeMap.en, name: VoiceNameMap.en },
      audioConfig: { audioEncoding: AUDIO_ENCODING },
    });

    if (!ttsResponse.audioContent) {
      throw new Error('Failed to generate audio content from Google TTS.');
    }
    const audioBuffer = Buffer.from(ttsResponse.audioContent);

    return audioBuffer;
  }
}
