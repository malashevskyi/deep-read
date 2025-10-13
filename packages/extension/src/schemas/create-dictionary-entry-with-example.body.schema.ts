// This file was copied by the sync-schemas-with-extension.js script. Do not modify it manually!
import { createDictionaryExampleSchema } from './create-dictionary-example.schema';
import { createDictionaryEntrySchema } from './create-dictionary-entry.schema';
import { z } from "zod";

const exampleSchema = createDictionaryExampleSchema.pick({
  example: true,
  translation: true,
  accent: true,
  accentTranslation: true,
  accentTranscription: true,
});

export const createDictionaryEntryWithExampleBodySchema =
  createDictionaryEntrySchema.extend({
    example: exampleSchema,
  });

export type CreateDictionaryEntryWithExampleBody = z.infer<typeof createDictionaryEntryWithExampleBodySchema>;
