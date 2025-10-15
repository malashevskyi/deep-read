import { createZodDto } from 'nestjs-zod';
import {
  AudioRecordsProperty,
  PronounceVideoLinksProperty,
  TextProperty,
  TranscriptionProperty,
} from '../decorators/dictionary-entry-fields.decorators';
import z from 'zod';
import { findOrCreateDictionaryEntryResponseSchema } from '@deep-read/types/lib/deep-read/dictionary-entries';

export class FindOrCreateDictionaryEntryResponseDto extends createZodDto(
  findOrCreateDictionaryEntryResponseSchema,
) {
  @TextProperty()
  override text: string;

  @TranscriptionProperty()
  override transcription: string;

  @AudioRecordsProperty()
  override audioRecords: string[];

  @PronounceVideoLinksProperty()
  override pronounceVideoLinks: string[];
}

export type FindOrCreateDictionaryEntryResponseType = z.infer<
  typeof findOrCreateDictionaryEntryResponseSchema
>;
