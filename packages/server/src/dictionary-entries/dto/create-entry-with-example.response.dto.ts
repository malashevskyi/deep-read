import { createZodDto } from 'nestjs-zod';
import { TextProperty } from '../decorators/dictionary-entry-fields.decorators';
import z from 'zod';
import { createDictionaryEntryWithExampleResponseSchema } from '@deep-read/types/lib/deep-read/dictionary-entries';

export class CreateEntryWithExampleResponseDto extends createZodDto(
  createDictionaryEntryWithExampleResponseSchema,
) {
  @TextProperty()
  override text: z.infer<
    typeof createDictionaryEntryWithExampleResponseSchema.shape.text
  >;
}
