import { createZodDto } from 'nestjs-zod';
import {
  TextProperty,
  TranscriptionProperty,
} from '../decorators/dictionary-entry-fields.decorators';
import { createDictionaryEntrySchema } from '@deep-read/types/lib/deep-read/dictionary-entries';

export class CreateDictionaryEntryDto extends createZodDto(
  createDictionaryEntrySchema,
) {
  @TextProperty()
  override text: string;

  @TranscriptionProperty()
  override transcription: string;
}
