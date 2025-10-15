import { dictionaryEntryTypeSchema } from './dictionary-entry.schema.js';

export const createDictionaryEntryWithExampleResponseSchema =
  dictionaryEntryTypeSchema.pick({ text: true });
