import { AnalysisResponse } from '@/types';
import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { AiAnalysisPort } from './ports/ai-analysis.port';

@Injectable()
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class AiService {
  constructor(private readonly aiAnalysisPort: AiAnalysisPort) {}

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

    const analysisResult: AnalysisResponse = {
      word: {
        text: structuredResponse.normalizedText,
        transcription: structuredResponse.transcription,
        translation: structuredResponse.wordTranslation,
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
