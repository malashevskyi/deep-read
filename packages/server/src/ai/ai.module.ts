import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { TtsModule } from '@/tts/tts.module';
import { AiAnalysisPort } from './ports/ai-analysis.port';
import { OpenAiAdapter } from './adapters/openai.adapter';

@Module({
  imports: [TtsModule],
  controllers: [AiController],
  providers: [
    AiService,
    {
      provide: AiAnalysisPort,
      useClass: OpenAiAdapter,
    },
  ],
})
export class AiModule {}
