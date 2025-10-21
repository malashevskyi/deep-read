import { Module } from '@nestjs/common';
import { AiController } from './ai.controller.js';
import { AiService } from './ai.service.js';
import { AiAnalysisPort } from './ports/ai-analysis.port.js';
import { OpenAiAdapter } from './adapters/openai.adapter.js';

@Module({
  imports: [],
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
