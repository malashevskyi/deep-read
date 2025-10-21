import z from 'zod';
import { dictionaryEntryTypeSchema } from './dictionary-entry.schema';

export const createDictionaryEntryWithExampleResponseSchema =
  dictionaryEntryTypeSchema.pick({ text: true });

export type CreateEntryWithExampleResponseType = z.infer<
  typeof createDictionaryEntryWithExampleResponseSchema
>;
