import { createZodDto } from 'nestjs-zod';
import {
  AccentProperty,
  AccentTranscriptionProperty,
  AccentTranslationProperty,
  DictionaryEntryIdProperty,
  ExampleProperty,
  TranslationProperty,
} from '../decorators/dictionary-example-fields.decorators';
import { createDictionaryExampleSchema } from '@deep-read/types/lib/deep-read/dictionary-examples';

export class CreateDictionaryExampleDto extends createZodDto(
  createDictionaryExampleSchema,
) {
  @ExampleProperty()
  override example: string;

  @TranslationProperty()
  override translation: string;

  @AccentProperty()
  override accent: string;

  @AccentTranslationProperty()
  override accentTranslation: string;

  @AccentTranscriptionProperty()
  override accentTranscription: string;

  @DictionaryEntryIdProperty()
  override dictionaryEntryId: string;
}
