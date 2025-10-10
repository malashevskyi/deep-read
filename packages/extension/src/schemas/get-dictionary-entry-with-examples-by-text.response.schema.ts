/**
 * ⚠️ auto-generated file - do not edit manually
 * 
 * This file was automatically copied from packages/server
 * using the sync-schemas-with-extension.js script.
 * 
 * To modify this schema, edit the source file in packages/server
 * and run: pnpm run sync:schemas
*/

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
