import { createDictionaryExampleSchema } from '@/dictionary-examples/schemas/create-dictionary-example.schema';
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
import { getDictionaryEntryWithExamplesByTextResponseTypeSchema } from '../schemas/get-dictionary-entry-with-examples-by-text.response.schema';

export class GetEntryWithExamplesByTextResponseDto extends createZodDto(
  getDictionaryEntryWithExamplesByTextResponseTypeSchema,
) {
  @TextProperty()
  text: string;

  @TranscriptionProperty()
  transcription: string;

  @PronounceVideoLinksProperty()
  pronounceVideoLinks: string[];

  @ExamplesProperty()
  examples: z.infer<typeof createDictionaryExampleSchema>[];

  @TranslationProperty()
  translation: string;

  @AudioRecordsProperty()
  audioRecords: string[];
}

export type GetEntryWithExamplesByTextResponseType = z.infer<
  typeof getDictionaryEntryWithExamplesByTextResponseTypeSchema
>;
