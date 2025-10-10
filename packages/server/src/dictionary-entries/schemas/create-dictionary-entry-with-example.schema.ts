import { createDictionaryExampleSchema } from '@/dictionary-examples/schemas/create-dictionary-example.schema';
import { createDictionaryEntrySchema } from './create-dictionary-entry.schema';

const CreateDictionaryEntryWithExampleSchema =
  createDictionaryEntrySchema.extend({
    example: createDictionaryExampleSchema.omit({ dictionaryEntryId: true }),
  });

export default CreateDictionaryEntryWithExampleSchema;
