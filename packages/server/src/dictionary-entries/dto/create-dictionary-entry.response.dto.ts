import { z } from 'zod';

export const FindOrCreateDictionaryEntryResponseSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  transcription: z.string(),
  audioRecords: z.array(z.string().url()),
  pronounceVideoLinks: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type FindOrCreateDictionaryEntryResponseDto = z.infer<
  typeof FindOrCreateDictionaryEntryResponseSchema
>;
