import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AiService } from './ai.service.js';
import { AnalyzeTextDto } from './dto/analyze-text.dto.js';
import { AnalyzeTextDocs } from './decorators/analyze-text.docs.decorator.js';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('analyze')
  @AnalyzeTextDocs()
  analyzeText(@Body() analyzeTextDto: AnalyzeTextDto) {
    return this.aiService.analyzeText(
      analyzeTextDto.text,
      analyzeTextDto.context,
    );
  }
}
