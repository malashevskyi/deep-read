import { createZodDto } from 'nestjs-zod';
import { createDictionaryEntryWithExampleResponseSchema } from '../schemas/create-dictionary-entry-with-example.response.schema';
import { TextProperty } from '../decorators/dictionary-entry-fields.decorators';
import z from 'zod';

export class CreateEntryWithExampleResponseDto extends createZodDto(
  createDictionaryEntryWithExampleResponseSchema,
) {
  @TextProperty()
  text: string;
}

export type CreateEntryWithExampleResponseType = z.infer<
  typeof createDictionaryEntryWithExampleResponseSchema
>;
