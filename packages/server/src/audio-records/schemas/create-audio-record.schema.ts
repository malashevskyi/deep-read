import { z } from 'zod';

export const CreateAudioRecordSchema = z.object({
  id: z.string().min(1, 'ID cannot be empty.'),
  audioUrl: z.url('audioUrl must be a valid URL.'),
  storagePath: z.string().min(1, 'storagePath cannot be empty.'),
  audioUrlExpiresAt: z.iso.date(),
  dictionaryEntryId: z.uuid().optional(),
});

export type CreateAudioRecordDto = z.infer<typeof CreateAudioRecordSchema>;
