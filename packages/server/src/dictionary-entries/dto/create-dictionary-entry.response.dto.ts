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
  override text: z.infer<
    typeof findOrCreateDictionaryEntryResponseSchema.shape.text
  >;

  @TranscriptionProperty()
  override transcription: z.infer<
    typeof findOrCreateDictionaryEntryResponseSchema.shape.transcription
  >;

  @AudioRecordsProperty()
  override audioRecords: z.infer<
    typeof findOrCreateDictionaryEntryResponseSchema.shape.audioRecords
  >;

  @PronounceVideoLinksProperty()
  override pronounceVideoLinks: z.infer<
    typeof findOrCreateDictionaryEntryResponseSchema.shape.pronounceVideoLinks
  >;
}
