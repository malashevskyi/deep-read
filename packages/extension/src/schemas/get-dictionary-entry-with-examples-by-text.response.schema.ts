// This file was copied by the sync-schemas-with-extension.js script. Do not modify it manually!
import z from 'zod';
import { dictionaryEntryTypeSchema } from './dictionary-entry.schema';
import { getDictionaryExampleResponseTypeSchema } from './get-dictionary-example.response.schema';

export const getDictionaryEntryWithExamplesByTextResponseTypeSchema =
  dictionaryEntryTypeSchema
    .pick({
      id: true,
      text: true,
      transcription: true,
      pronounceVideoLinks: true,
    })
    .extend({
      translation: z.string(),
      audioRecords: z.array(z.url()),
      examples: z.array(getDictionaryExampleResponseTypeSchema),
    })
    .strict();

export type GetDictionaryEntryWithExamplesByTextResponseType = z.infer<typeof getDictionaryEntryWithExamplesByTextResponseTypeSchema>;
