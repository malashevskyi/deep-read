import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { TtsModule } from '@/tts/tts.module';

@Module({
  imports: [TtsModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
