import { z } from "zod";

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

export const GenerateAudioSchema = z.object({
  audioUrl: z.string(),
});

export type GenerateAudioResponse = z.infer<typeof GenerateAudioSchema>;

export const SaveToDictionarySchema = z.object({
  id: z.uuid(),
  text: z.string(),
  transcription: z.string(),
  pronounceVideoLinks: z.array(z.string()),
  audioRecords: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type SaveToDictionaryResponse = z.infer<typeof SaveToDictionarySchema>;
