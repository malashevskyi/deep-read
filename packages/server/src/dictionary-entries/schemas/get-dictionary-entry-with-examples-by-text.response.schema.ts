import { dictionaryEntryTypeSchema } from '@deep-read/types/lib/deep-read/dictionary-entries';
import { getDictionaryExampleResponseTypeSchema } from '@deep-read/types/lib/deep-read/dictionary-examples';
import z from 'zod';

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
