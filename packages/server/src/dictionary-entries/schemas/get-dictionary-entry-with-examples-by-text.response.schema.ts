import z from 'zod';
import { dictionaryEntryTypeSchema } from './dictionary-entry.schema';
import { getDictionaryExampleResponseTypeSchema } from '@/dictionary-examples/schemas/get-dictionary-example.response.schema';

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
