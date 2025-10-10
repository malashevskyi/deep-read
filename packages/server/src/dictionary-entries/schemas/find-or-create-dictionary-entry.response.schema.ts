import z from 'zod';
import { dictionaryEntryTypeSchema } from './dictionary-entry.schema';

export const FindOrCreateDictionaryEntryResponseSchema =
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

export default FindOrCreateDictionaryEntryResponseSchema;
