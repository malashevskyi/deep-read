// This file was copied by the sync-schemas-with-extension.js script. Do not modify it manually!
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
