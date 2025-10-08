import z from 'zod';
import { FindOrCreateDictionaryEntryResponseSchema } from './find-or-create-dictionary-entry.response.schema';
import { CreateDictionaryExampleSchema } from '@/dictionary-examples/schemas/create-dictionary-example.schema';

const CreateDictionaryEntryWithExampleResponseSchema =
  FindOrCreateDictionaryEntryResponseSchema.extend({
    translation: z.string(),
    examples: z.array(CreateDictionaryExampleSchema),
  });

export default CreateDictionaryEntryWithExampleResponseSchema;
