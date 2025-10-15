import { audioRecordTypeSchema } from '@deep-read/types/lib/deep-read/audio-records';
import z from 'zod';

export const createAudioRecordSchema = audioRecordTypeSchema
  .pick({
    id: true,
    audioUrl: true,
    storagePath: true,
    dictionaryEntryId: true,
  })
  .extend({
    audioUrlExpiresAt: z.url(),
  });
