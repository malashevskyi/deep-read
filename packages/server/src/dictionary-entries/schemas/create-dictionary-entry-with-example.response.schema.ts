import { dictionaryEntryTypeSchema } from '@deep-read/types/lib/deep-read/dictionary-entries';

export const createDictionaryEntryWithExampleResponseSchema =
  dictionaryEntryTypeSchema.pick({ text: true });
