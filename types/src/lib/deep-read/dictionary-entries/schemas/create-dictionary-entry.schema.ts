import { dictionaryEntryTypeSchema } from './index.js';

export const createDictionaryEntrySchema = dictionaryEntryTypeSchema.pick({
  text: true,
  transcription: true,
});
