import { CreateDictionaryExample } from '@/dictionary-examples/schemas/create-dictionary-example.schema';
import { createZodDto } from 'nestjs-zod';
import {
  ExampleProperty,
  TextProperty,
  TranscriptionProperty,
} from '../decorators/dictionary-entry-fields.decorators';
import { createDictionaryEntryWithExampleBodySchema } from '../schemas/create-dictionary-entry-with-example.body.schema';

export class CreateEntryWithExampleDto extends createZodDto(
  createDictionaryEntryWithExampleBodySchema,
) {
  @TextProperty()
  text: string;

  @TranscriptionProperty()
  transcription: string;

  @ExampleProperty()
  example: Omit<CreateDictionaryExample, 'dictionaryEntryId'>;
}
