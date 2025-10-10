import { dictionaryEntryTypeSchema } from './dictionary-entry.schema';

export const createDictionaryEntryWithExampleResponseSchema =
  dictionaryEntryTypeSchema.pick({ text: true });
