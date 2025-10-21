import { createZodDto } from 'nestjs-zod';
import {
  AccentProperty,
  AccentTranscriptionProperty,
  AccentTranslationProperty,
  DictionaryEntryIdProperty,
  ExampleProperty,
  TranslationProperty,
} from '../decorators/dictionary-example-fields.decorators.js';
import { createDictionaryExampleSchema } from '@deep-read/types/lib/deep-read/dictionary-examples';
import z from 'zod';

export class CreateDictionaryExampleDto extends createZodDto(
  createDictionaryExampleSchema,
) {
  @ExampleProperty()
  override example: z.infer<typeof createDictionaryExampleSchema.shape.example>;

  @TranslationProperty()
  override translation: z.infer<
    typeof createDictionaryExampleSchema.shape.translation
  >;

  @AccentProperty()
  override accent: z.infer<typeof createDictionaryExampleSchema.shape.accent>;

  @AccentTranslationProperty()
  override accentTranslation: z.infer<
    typeof createDictionaryExampleSchema.shape.accentTranslation
  >;

  @AccentTranscriptionProperty()
  override accentTranscription: z.infer<
    typeof createDictionaryExampleSchema.shape.accentTranscription
  >;

  @DictionaryEntryIdProperty()
  override dictionaryEntryId: z.infer<
    typeof createDictionaryExampleSchema.shape.dictionaryEntryId
  >;
}
