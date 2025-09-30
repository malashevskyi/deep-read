import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI, { ClientOptions } from 'openai';
import { isAPIError } from '@/shared/utils/isAPIError';

@Injectable()
export class AiService {
  private readonly openai: InstanceType<typeof OpenAI>;
  private readonly logger = new Logger(AiService.name);

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

  async analyzeText(text: string): Promise<{ explanation: string }> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'Explain the provided text in simple terms, as if you were explaining it to a language learner. Respond in the same language as the input text.',
          },
          {
            role: 'user',
            content: text,
          },
        ],
      });

      const explanation = completion.choices[0]?.message?.content?.trim();
      if (!explanation) {
        this.logger.error(
          'OpenAI response is empty or in an unexpected format.',
        );
        throw new InternalServerErrorException(
          'Failed to get a valid explanation from AI.',
        );
      }

      return { explanation };
    } catch (error: unknown) {
      if (isAPIError(error)) {
        this.logger.error(
          {
            message: 'OpenAI API call failed',
            status: error.status,
            error: error.error,
          },
          error.stack,
        );
      } else {
        this.logger.error(
          'An unexpected error occurred in analyzeText',
          error instanceof Error ? error.stack : error,
        );
      }

      throw new InternalServerErrorException(
        'Failed to get explanation from AI.',
      );
    }
  }
}
