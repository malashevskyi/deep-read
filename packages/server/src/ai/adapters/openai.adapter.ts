import { AppErrorCode } from '@/shared/exceptions/AppErrorCode';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import {
  AiAnalysisPort,
  AiStructuredResponse,
  AiStructuredResponseSchema,
} from '../ports/ai-analysis.port';
import { ErrorService } from '@/errors/errors.service';

const OpenAIPrompt = `You are an advanced language analysis tool. Your task is to analyze a selected text/word/phrase within a given context.
Respond ONLY with a valid JSON object in the following format:
{
  "normalizedText": "The text in its correct, dictionary form. If the original text is capitalized because it's at the start of a sentence but is not a proper noun or it is just an author style, convert it to lowercase. If it's a proper noun (like a name, brand, or month), keep the capitalization.",
  "transcription": "The phonetic transcription of the normalized text, e.g., [wɜːd].",
  "adaptedSentence": "A clear, simple example sentence in the context I have provided that includes the text/word/phase I have provided. The sentence can be slightly modified to fit the context naturally, but it should not change the meaning of the text/word/phase. Or it can be the same sentence from the context if it grammatically and naturally fits.",
  "translation": "The translation of the adapted sentence into Ukrainian in the provided context."
}`;

@Injectable()
export class OpenAiAdapter implements AiAnalysisPort {
  private readonly openai: OpenAI;

  constructor(
    private readonly configService: ConfigService,
    private readonly errorService: ErrorService,
  ) {
    const apiKey = this.configService.getOrThrow<string>('OPENAI_API_KEY');
    const projectId = this.configService.get<string>('OPENAI_PROJECT_ID');
    this.openai = new OpenAI({ apiKey, project: projectId || undefined });
  }

  async getStructuredAnalysis(
    text: string,
    context: string,
  ): Promise<AiStructuredResponse> {
    try {
      const openAiModel = this.configService.getOrThrow<string>('OPENAI_MODEL');

      const userPrompt = `Selected Text: "${text}"\nContext: "${context}"`;

      const completion = await this.openai.chat.completions.create({
        model: openAiModel,
        messages: [
          { role: 'system', content: OpenAIPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
      });

      const responseContent = completion.choices[0].message.content;
      if (!responseContent) {
        throw new Error('OpenAI returned an empty response content.');
      }

      return AiStructuredResponseSchema.parse(JSON.parse(responseContent));
    } catch (error) {
      this.errorService.handle(
        AppErrorCode.AI_RESPONSE_INVALID,
        'Failed to get a valid structured analysis from OpenAI.',
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
