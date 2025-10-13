/**
* This file was copied by the sync-schemas-with-extension.js script. Do not modify it manually!
*/
import z from 'zod';

export const generateAudioResponseSchema = z.object({
  audioUrl: z.string(),
});

export type GenerateAudioResponse = z.infer<typeof generateAudioResponseSchema>;
