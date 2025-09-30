import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI, { ClientOptions } from 'openai';
import { AnalysisResponse } from '@/types';
import { TtsService } from '@/tts/tts.service';
import z from 'zod';
import { ErrorService } from '@/errors/errors.service';
import { AppErrorCode } from '@/shared/exceptions/AppErrorCode';

const OpenAiResponseSchema = z.object({
  normalizedText: z.string(),
  transcription: z.string(),
  adaptedSentence: z.string(),
  translation: z.string(),
});

type OpenAiStructuredResponse = z.infer<typeof OpenAiResponseSchema>;

@Injectable()
export class AiService {
  private readonly openai: InstanceType<typeof OpenAI>;

  constructor(
    private readonly configService: ConfigService,
    private readonly ttsService: TtsService,
    private readonly errorService: ErrorService,
  ) {
    const apiKey = this.configService.getOrThrow<string>('OPENAI_API_KEY');
    const projectId =
      this.configService.getOrThrow<string>('OPENAI_PROJECT_ID');

    const options: ClientOptions = {
      apiKey,
      organization: null,
      project: projectId,
      webhookSecret: null,
      baseURL: 'https://api.openai.com/v1',
      maxRetries: 3,
      timeout: 10000,
    };
    this.openai = new OpenAI(options);
  }

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
    const structuredResponse = await this.getStructuredAnalysis(
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

  /**
   * Analyzes text in context using OpenAI and returns a structured JSON response.
   *
   * @param text - Text/word/phase to analyze.
   * @param context - Context for the text.
   * @returns Structured analysis result.
   * @throws If OpenAI response is empty or invalid.
   */
  private async getStructuredAnalysis(
    text: string,
    context: string,
  ): Promise<OpenAiStructuredResponse> {
    const systemPrompt = `You are an advanced language analysis tool. Your task is to analyze a selected text/word/phase within a given context.
Respond ONLY with a valid JSON object in the following format:
{
  "normalizedText": "The text in its correct, dictionary form. If the original text is capitalized because it's at the start of a sentence but is not a proper noun or it is just an author style, convert it to lowercase. If it's a proper noun (like a name, brand, or month), keep the capitalization.",
  "transcription": "The phonetic transcription of the normalized text, e.g., [wɜːd].",
  "adaptedSentence": "A clear, simple example sentence in the context I have provided that includes the text/word/phase I have provided. The sentence can be slightly modified to fit the context naturally, but it should not change the meaning of the text/word/phase. Or it can be the same sentence from the context if it grammatically and naturally fits.",
  "translation": "The translation of the adapted sentence into Ukrainian in the provided context."
}`;

    const userPrompt = `Selected Text: "${text}"
Context: "${context}"`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-5-chat-latest',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
    });

    const responseContent = completion.choices[0].message.content;

    if (!responseContent) {
      this.errorService.handle(
        AppErrorCode.AI_RESPONSE_INVALID,
        'OpenAI returned an empty response content.',
        { text, context },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const parsedJson = JSON.parse(responseContent);

      return OpenAiResponseSchema.parse(parsedJson);
    } catch (error) {
      this.errorService.handle(
        AppErrorCode.AI_RESPONSE_INVALID,
        'Failed to parse or validate OpenAI response.',
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
