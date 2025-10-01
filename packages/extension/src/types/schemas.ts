import { z } from "zod";

export const AnalysisResponseSchema = z.object({
  word: z.object({
    text: z.string(),
    transcription: z.string(),
    audioUrl: z.string(),
    storagePath: z.string(),
  }),
  example: z.object({
    id: z.string(),
    adaptedSentence: z.string(),
    translation: z.string(),
  }),
});

export type AnalysisResponse = z.infer<typeof AnalysisResponseSchema>;
