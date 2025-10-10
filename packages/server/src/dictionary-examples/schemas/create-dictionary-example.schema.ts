import z from 'zod';

export const createDictionaryExampleSchema = z
  .object({
    example: z.string().min(1, 'Example text cannot be empty.'),
    translation: z.string().min(1, 'Translation cannot be empty.'),
    accent: z.string().min(1, 'Accent cannot be empty.'),
    accentTranslation: z.string().min(1, 'Accent translation cannot be empty.'),
    accentTranscription: z
      .string()
      .min(1, 'Accent transcription cannot be empty.'),
    dictionaryEntryId: z.uuid('Must be a valid UUID.'),
  })
  .strict();
