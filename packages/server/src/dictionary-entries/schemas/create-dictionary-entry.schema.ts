import z from 'zod';

export const CreateDictionaryEntrySchema = z
  .object({
    text: z.string().min(1, 'Text cannot be empty.'),
    transcription: z.string(),
  })
  .strict();

export default CreateDictionaryEntrySchema;
