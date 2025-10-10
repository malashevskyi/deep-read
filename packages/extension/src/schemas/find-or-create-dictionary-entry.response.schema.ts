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

export const findOrCreateDictionaryEntryResponseSchema =
  dictionaryEntryTypeSchema
    .pick({
      id: true,
      text: true,
      transcription: true,
      pronounceVideoLinks: true,
      createdAt: true,
      updatedAt: true,
    })
    .extend({
      audioRecords: z.array(z.url()),
    });

export type FindOrCreateDictionaryEntryResponse = z.infer<typeof findOrCreateDictionaryEntryResponseSchema>;
