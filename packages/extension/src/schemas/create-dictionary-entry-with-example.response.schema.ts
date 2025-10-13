// This file was copied by the sync-schemas-with-extension.js script. Do not modify it manually!
import { dictionaryEntryTypeSchema } from './dictionary-entry.schema';
import { z } from "zod";

export const createDictionaryEntryWithExampleResponseSchema =
  dictionaryEntryTypeSchema.pick({ text: true });

export type CreateDictionaryEntryWithExampleResponse = z.infer<typeof createDictionaryEntryWithExampleResponseSchema>;
