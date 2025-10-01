import { z } from 'zod';

export const AiStructuredResponseSchema = z.object({
  normalizedText: z.string(),
  transcription: z.string(),
  adaptedSentence: z.string(),
  translation: z.string(),
});

export type AiStructuredResponse = z.infer<typeof AiStructuredResponseSchema>;

export abstract class AiAnalysisPort {
  abstract getStructuredAnalysis(
    text: string,
    context: string,
  ): Promise<AiStructuredResponse>;
}
