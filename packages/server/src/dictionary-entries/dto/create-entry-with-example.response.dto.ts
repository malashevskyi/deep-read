import { createZodDto } from 'nestjs-zod';
import CreateDictionaryEntryWithExampleResponseSchema from '../schemas/create-dictionary-entry-with-example.response.schema';

export class CreateEntryWithExampleResponseDto extends createZodDto(
  CreateDictionaryEntryWithExampleResponseSchema,
) {}
