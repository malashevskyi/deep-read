// This file was copied by the sync-schemas-with-extension.js script. Do not modify it manually!
import z from 'zod';
import { dictionaryExampleTypeSchema } from './dictionary-example.schema';

export const createDictionaryExampleSchema = dictionaryExampleTypeSchema.pick({
  example: true,
  translation: true,
  accent: true,
  accentTranslation: true,
  accentTranscription: true,
  dictionaryEntryId: true,
});

export type CreateDictionaryExample = z.infer<
  typeof createDictionaryExampleSchema
>;
