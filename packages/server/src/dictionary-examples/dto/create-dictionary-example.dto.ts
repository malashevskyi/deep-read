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
  example: string;

  @TranslationProperty()
  translation: string;

  @AccentProperty()
  accent: string;

  @AccentTranslationProperty()
  accentTranslation: string;

  @AccentTranscriptionProperty()
  accentTranscription: string;

  @DictionaryEntryIdProperty()
  dictionaryEntryId: string;
}
