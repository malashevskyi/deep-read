import { z } from "zod";

export const AnalysisResponseSchema = z.object({
  word: z.object({
    text: z.string(),
    transcription: z.string(),
  }),
  example: z.object({
    id: z.string(),
    adaptedSentence: z.string(),
    translation: z.string(),
  }),
});

export type AnalysisResponse = z.infer<typeof AnalysisResponseSchema>;

export const GenerateAudioSchema = z.object({
  audioUrl: z.string(),
  storagePath: z.string(),
});

export type GenerateAudioResponse = z.infer<typeof GenerateAudioSchema>;
