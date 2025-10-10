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

export const SaveToDictionaryResponseSchema = SaveToDictionarySchema;

export type SaveToDictionaryResponse = z.infer<
  typeof SaveToDictionaryResponseSchema
>;

export const CreateDictionaryEntrySchema = z
  .object({
    text: z.string().min(1, "Text cannot be empty."),
    transcription: z.string(),
  })
  .strict();

export type CreateDictionaryEntry = z.infer<typeof CreateDictionaryEntrySchema>;

export const CreateDictionaryExampleSchema = z.object({
  example: z.string().min(1, "Example text cannot be empty."),
  translation: z.string().min(1, "Translation cannot be empty."),
  accent: z.string().min(1, "Accent cannot be empty."),
  accentTranslation: z.string().min(1, "Accent translation cannot be empty."),
  accentTranscription: z
    .string()
    .min(1, "Accent transcription cannot be empty."),
  dictionaryEntryId: z.uuid("Must be a valid UUID."),
});

export const CreateDictionaryEntryWithExampleSchema =
  CreateDictionaryEntrySchema.extend({
    example: CreateDictionaryExampleSchema.omit({ dictionaryEntryId: true }),
  });

export type CreateDictionaryEntryWithExample = z.infer<
  typeof CreateDictionaryEntryWithExampleSchema
>;

export const WordHistorySchema = SaveToDictionaryResponseSchema.extend({
  translation: z.string(),
  examples: z.array(
    z.object({
      example: z.string(),
      translation: z.string(),
      accent: z.string(),
      accentTranslation: z.string(),
      accentTranscription: z.string(),
      dictionaryEntryId: z.string().uuid(),
    }),
  ),
});

export type WordHistoryResponse = z.infer<typeof WordHistorySchema>;
