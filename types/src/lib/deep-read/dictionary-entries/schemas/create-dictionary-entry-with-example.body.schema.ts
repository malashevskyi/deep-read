import { createDictionaryExampleSchema } from '../../dictionary-examples/index.js';
import { createDictionaryEntrySchema } from './index.js';

export const exampleSchema = createDictionaryExampleSchema.pick({
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
