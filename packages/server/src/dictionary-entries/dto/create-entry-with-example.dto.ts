import { createZodDto } from 'nestjs-zod';
import {
  ExampleProperty,
  TextProperty,
  TranscriptionProperty,
} from '../decorators/dictionary-entry-fields.decorators';
import { createDictionaryEntryWithExampleBodySchema } from '@deep-read/types/lib/deep-read/dictionary-entries';
import z from 'zod';

export class CreateEntryWithExampleDto extends createZodDto(
  createDictionaryEntryWithExampleBodySchema,
) {
  @TextProperty()
  override text: z.infer<
    typeof createDictionaryEntryWithExampleBodySchema.shape.text
  >;

  @TranscriptionProperty()
  override transcription: z.infer<
    typeof createDictionaryEntryWithExampleBodySchema.shape.transcription
  >;

  @ExampleProperty()
  override example: z.infer<
    typeof createDictionaryEntryWithExampleBodySchema.shape.example
  >;
}
