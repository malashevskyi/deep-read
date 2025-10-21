import z from 'zod';
import { createDictionaryExampleSchema } from '../../dictionary-examples/index';
import { createDictionaryEntrySchema } from './create-dictionary-entry.schema';

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

export type CreateDictionaryEntryWithExampleBodyType = z.infer<
  typeof createDictionaryEntryWithExampleBodySchema
>;
