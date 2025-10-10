import { dictionaryExampleTypeSchema } from './dictionary-example.schema';

export const createDictionaryExampleSchema = dictionaryExampleTypeSchema.pick({
  example: true,
  translation: true,
  accent: true,
  accentTranslation: true,
  accentTranscription: true,
  dictionaryEntryId: true,
});
