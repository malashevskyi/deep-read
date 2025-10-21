import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import type { GenerateAudioResponse } from '@deep-read/types/lib/deep-read/tts';
import { TtsService } from './tts.service.js';
import { GenerateAudioDto } from './dto/generate-audio.dto.js';

@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Post('generate-audio')
  @UsePipes(ZodValidationPipe)
  async generateAudio(
    @Body() body: GenerateAudioDto,
  ): Promise<GenerateAudioResponse> {
    return this.ttsService.generateAndUploadAudio(body.text);
  }
}
