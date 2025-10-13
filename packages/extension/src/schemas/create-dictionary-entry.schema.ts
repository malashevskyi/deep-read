// This file was copied by the sync-schemas-with-extension.js script. Do not modify it manually!
import { dictionaryEntryTypeSchema } from './dictionary-entry.schema';
import { z } from "zod";

export const createDictionaryEntrySchema = dictionaryEntryTypeSchema.pick({
  text: true,
  transcription: true,
});

export type CreateDictionaryEntry = z.infer<typeof createDictionaryEntrySchema>;
