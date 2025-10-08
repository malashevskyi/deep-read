import z from 'zod';

export const AnalysisResponseSchema = z.object({
  word: z.object({
    text: z.string(),
    transcription: z.string(),
    translation: z.string(),
  }),
  example: z.object({
    adaptedSentence: z.string(),
    translation: z.string(),
  }),
});

export type AnalysisResponse = z.infer<typeof AnalysisResponseSchema>;
