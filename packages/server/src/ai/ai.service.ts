import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI, { ClientOptions } from 'openai';
import { AnalysisResponse } from '@/types';
import { TtsService } from '@/tts/tts.service';
import { ErrorService } from '@/errors/errors.service';
import { AiAnalysisPort } from './ports/ai-analysis.port';

@Injectable()
export class AiService {
  constructor(
    private readonly ttsService: TtsService,
    private readonly aiAnalysisPort: AiAnalysisPort,
  ) {}

  /**
   * Analyzes selected text in context and returns structured analysis with audio.
   *
   * @param selectedText - Text to analyze.
   * @param context - Context for the text.
   * @returns AnalysisResponse with word and example details.
   */
  async analyzeText(
    selectedText: string,
    context: string,
  ): Promise<AnalysisResponse> {
    const structuredResponse = await this.aiAnalysisPort.getStructuredAnalysis(
      selectedText,
      context,
    );

    const { audioUrl, storagePath } =
      await this.ttsService.generateAndUploadAudio(
        structuredResponse.normalizedText,
      );

    const analysisResult: AnalysisResponse = {
      word: {
        text: structuredResponse.normalizedText,
        transcription: structuredResponse.transcription,
        audioUrl,
        storagePath,
      },
      example: {
        id: structuredResponse.adaptedSentence,
        adaptedSentence: structuredResponse.adaptedSentence,
        translation: structuredResponse.translation,
      },
    };

    // TODO: Зберігаємо в базу даних в supabase

    return analysisResult;
  }
}
