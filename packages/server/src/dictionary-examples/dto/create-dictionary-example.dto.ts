import { createZodDto } from 'nestjs-zod';
import { createDictionaryExampleSchema } from '../schemas/create-dictionary-example.schema';
import {
  AccentProperty,
  AccentTranscriptionProperty,
  AccentTranslationProperty,
  DictionaryEntryIdProperty,
  ExampleProperty,
  TranslationProperty,
} from '../decorators/dictionary-example-fields.decorators';

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
