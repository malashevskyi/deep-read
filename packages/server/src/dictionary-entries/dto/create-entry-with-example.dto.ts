import { createZodDto } from 'nestjs-zod';
import CreateDictionaryEntryWithExampleSchema from '../schemas/create-dictionary-entry-with-example.schema';

export class CreateEntryWithExampleDto extends createZodDto(
  CreateDictionaryEntryWithExampleSchema,
) {}
