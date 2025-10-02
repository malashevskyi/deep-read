import { forwardRef, Module } from '@nestjs/common';
import { TtsService } from './tts.service';
import { GoogleTtsAdapter } from './adapters/google-tts.adapter';
import { TextToSpeechPort } from './ports/tts.port';
import { AudioStoragePort } from './ports/audio-storage.port';
import { FirebaseStorageAdapter } from './adapters/firebase-storage.adapter';
import { ConfigModule } from '@nestjs/config';
import { TtsController } from './tts.controller';
import { AudioRecordsModule } from '@/audio-records/audio-records.module';
import { ErrorsModule } from '@/errors/errors.module';

@Module({
  imports: [forwardRef(() => ConfigModule), AudioRecordsModule, ErrorsModule],
  providers: [
    TtsService,
    GoogleTtsAdapter,
    FirebaseStorageAdapter,
    {
      provide: TextToSpeechPort,
      useClass: GoogleTtsAdapter,
    },
    {
      provide: AudioStoragePort,
      useClass: FirebaseStorageAdapter,
    },
  ],
  exports: [TtsService],
  controllers: [TtsController],
})
export class TtsModule {}
