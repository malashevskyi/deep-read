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
import { createDictionaryExampleSchema } from '@deep-read/types/lib/deep-read/dictionary-examples';

export class GetEntryWithExamplesByTextResponseDto extends createZodDto(
  getDictionaryEntryWithExamplesByTextResponseTypeSchema,
) {
  @TextProperty()
  override text: string;

  @TranscriptionProperty()
  override transcription: string;

  @PronounceVideoLinksProperty()
  override pronounceVideoLinks: string[];

  @ExamplesProperty()
  override examples: z.infer<typeof createDictionaryExampleSchema>[];

  @TranslationProperty()
  override translation: string;

  @AudioRecordsProperty()
  override audioRecords: string[];
}

export type GetEntryWithExamplesByTextResponseType = z.infer<
  typeof getDictionaryEntryWithExamplesByTextResponseTypeSchema
>;
