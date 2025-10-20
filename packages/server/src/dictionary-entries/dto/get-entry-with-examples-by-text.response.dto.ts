import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import {
  AudioRecordsProperty,
  ExamplesProperty,
  PronounceVideoLinksProperty,
  TextProperty,
  TranscriptionProperty,
  TranslationProperty,
} from '../decorators/dictionary-entry-fields.decorators';
import { getDictionaryEntryWithExamplesByTextResponseSchema } from '@deep-read/types/lib/deep-read/dictionary-entries';

export class GetEntryWithExamplesByTextResponseDto extends createZodDto(
  getDictionaryEntryWithExamplesByTextResponseSchema,
) {
  @TextProperty()
  override text: z.infer<
    typeof getDictionaryEntryWithExamplesByTextResponseSchema.shape.text
  >;

  @TranscriptionProperty()
  override transcription: z.infer<
    typeof getDictionaryEntryWithExamplesByTextResponseSchema.shape.transcription
  >;

  @PronounceVideoLinksProperty()
  override pronounceVideoLinks: z.infer<
    typeof getDictionaryEntryWithExamplesByTextResponseSchema.shape.pronounceVideoLinks
  >;

  @ExamplesProperty()
  override examples: z.infer<
    typeof getDictionaryEntryWithExamplesByTextResponseSchema.shape.examples
  >;

  @TranslationProperty()
  override translation: z.infer<
    typeof getDictionaryEntryWithExamplesByTextResponseSchema.shape.translation
  >;

  @AudioRecordsProperty()
  override audioRecords: z.infer<
    typeof getDictionaryEntryWithExamplesByTextResponseSchema.shape.audioRecords
  >;
}
