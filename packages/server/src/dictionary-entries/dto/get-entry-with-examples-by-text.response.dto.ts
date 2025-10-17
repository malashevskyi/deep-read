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
import { getDictionaryEntryWithExamplesByTextResponseTypeSchema } from '@deep-read/types/lib/deep-read/dictionary-entries';

export class GetEntryWithExamplesByTextResponseDto extends createZodDto(
  getDictionaryEntryWithExamplesByTextResponseTypeSchema,
) {
  @TextProperty()
  override text: z.infer<
    typeof getDictionaryEntryWithExamplesByTextResponseTypeSchema.shape.text
  >;

  @TranscriptionProperty()
  override transcription: z.infer<
    typeof getDictionaryEntryWithExamplesByTextResponseTypeSchema.shape.transcription
  >;

  @PronounceVideoLinksProperty()
  override pronounceVideoLinks: z.infer<
    typeof getDictionaryEntryWithExamplesByTextResponseTypeSchema.shape.pronounceVideoLinks
  >;

  @ExamplesProperty()
  override examples: z.infer<
    typeof getDictionaryEntryWithExamplesByTextResponseTypeSchema.shape.examples
  >;

  @TranslationProperty()
  override translation: z.infer<
    typeof getDictionaryEntryWithExamplesByTextResponseTypeSchema.shape.translation
  >;

  @AudioRecordsProperty()
  override audioRecords: z.infer<
    typeof getDictionaryEntryWithExamplesByTextResponseTypeSchema.shape.audioRecords
  >;
}
