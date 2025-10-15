import { createZodDto } from 'nestjs-zod';
import {
  ExampleProperty,
  TextProperty,
  TranscriptionProperty,
} from '../decorators/dictionary-entry-fields.decorators';
import { createDictionaryEntryWithExampleBodySchema } from '@deep-read/types/lib/deep-read/dictionary-entries';
import type { CreateDictionaryExample } from '@deep-read/types/lib/deep-read/dictionary-examples';

export class CreateEntryWithExampleDto extends createZodDto(
  createDictionaryEntryWithExampleBodySchema,
) {
  @TextProperty()
  override text: string;

  @TranscriptionProperty()
  override transcription: string;

  @ExampleProperty()
  override example: Omit<CreateDictionaryExample, 'dictionaryEntryId'>;
}
