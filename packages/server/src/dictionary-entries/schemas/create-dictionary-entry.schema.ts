import { dictionaryEntryTypeSchema } from '@deep-read/types/lib/deep-read/dictionary-entries';

export const createDictionaryEntrySchema = dictionaryEntryTypeSchema.pick({
  text: true,
  transcription: true,
});
