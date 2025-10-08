import { CreateDictionaryExampleSchema } from '@/dictionary-examples/schemas/create-dictionary-example.schema';
import { CreateDictionaryEntrySchema } from '../dto/create-dictionary-entry.dto';

const CreateDictionaryEntryWithExampleSchema =
  CreateDictionaryEntrySchema.extend({
    example: CreateDictionaryExampleSchema.omit({ dictionaryEntryId: true }),
  });

export default CreateDictionaryEntryWithExampleSchema;
