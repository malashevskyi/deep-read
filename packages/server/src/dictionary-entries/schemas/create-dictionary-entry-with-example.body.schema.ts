import { createDictionaryEntrySchema } from '@deep-read/types/lib/deep-read/dictionary-entries';
import { createDictionaryExampleSchema } from '@deep-read/types/lib/deep-read/dictionary-examples';

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
