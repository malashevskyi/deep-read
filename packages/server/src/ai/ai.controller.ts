import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { AnalyzeTextDto } from './dto/analyze-text.dto';
import { ApiTags } from '@nestjs/swagger';
import { AnalyzeTextDocs } from './decorators/analyze-text.docs.decorator';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('analyze')
  @AnalyzeTextDocs()
  analyzeText(@Body() analyzeTextDto: AnalyzeTextDto) {
    return this.aiService.analyzeText(analyzeTextDto.text);
  }
}
