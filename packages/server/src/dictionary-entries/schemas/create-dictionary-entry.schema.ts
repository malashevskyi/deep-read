import { dictionaryEntryTypeSchema } from './dictionary-entry.schema';

export const createDictionaryEntrySchema = dictionaryEntryTypeSchema.pick({
  text: true,
  transcription: true,
});
