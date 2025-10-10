import { createDictionaryExampleSchema } from '@/dictionary-examples/schemas/create-dictionary-example.schema';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import {
  ExampleProperty,
  TextProperty,
  TranscriptionProperty,
} from '../decorators/dictionary-entry-fields.decorators';
import { createDictionaryEntrySchema } from '../schemas/create-dictionary-entry.schema';

const exampleSchema = createDictionaryExampleSchema.omit({
  dictionaryEntryId: true,
});

export class CreateEntryWithExampleDto extends createZodDto(
  createDictionaryEntrySchema.extend({
    example: exampleSchema,
  }),
) {
  @TextProperty()
  text: string;

  @TranscriptionProperty()
  transcription: string;

  @ExampleProperty()
  example: z.infer<typeof exampleSchema>;
}
