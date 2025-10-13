import { createDictionaryExampleSchema } from '@/dictionary-examples/schemas/create-dictionary-example.schema';
import { createDictionaryEntrySchema } from './create-dictionary-entry.schema';

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
