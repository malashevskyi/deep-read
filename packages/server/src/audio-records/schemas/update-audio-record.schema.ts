import { z } from 'zod';

export const UpdateAudioRecordSchema = z.object({
  id: z.string().min(1, 'ID cannot be empty.'),
  dictionaryEntryId: z.uuid(),
});

export type UpdateAudioRecordDto = z.infer<typeof UpdateAudioRecordSchema>;
