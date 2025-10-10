import { createZodDto } from 'nestjs-zod';
import {
  AudioRecordsProperty,
  PronounceVideoLinksProperty,
  TextProperty,
  TranscriptionProperty,
} from '../decorators/dictionary-entry-fields.decorators';
import { findOrCreateDictionaryEntryResponseSchema } from '../schemas/find-or-create-dictionary-entry.response.schema';
import z from 'zod';

export class FindOrCreateDictionaryEntryResponseDto extends createZodDto(
  findOrCreateDictionaryEntryResponseSchema,
) {
  @TextProperty()
  text;

  @TranscriptionProperty()
  transcription;

  @AudioRecordsProperty()
  audioRecords: string[];

  @PronounceVideoLinksProperty()
  pronounceVideoLinks: string[];
}

export type FindOrCreateDictionaryEntryResponseType = z.infer<
  typeof findOrCreateDictionaryEntryResponseSchema
>;
