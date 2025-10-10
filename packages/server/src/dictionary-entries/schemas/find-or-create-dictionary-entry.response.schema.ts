import z from 'zod';

export const FindOrCreateDictionaryEntryResponseSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  transcription: z.string(),
  audioRecords: z.array(z.string().url()),
  pronounceVideoLinks: z.array(z.string()),
  createdAt: z.iso.date(),
  updatedAt: z.iso.date(),
});

export default FindOrCreateDictionaryEntryResponseSchema;
