import z from 'zod';
import { dictionaryEntryTypeSchema } from '@deep-read/types/lib/deep-read/dictionary-entries';

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
