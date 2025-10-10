import { createZodDto } from 'nestjs-zod';
import {
  TextProperty,
  TranscriptionProperty,
} from '../decorators/dictionary-entry-fields.decorators';
import { createDictionaryEntrySchema } from '../schemas/create-dictionary-entry.schema';

export class CreateDictionaryEntryDto extends createZodDto(
  createDictionaryEntrySchema,
) {
  @TextProperty()
  text: string;

  @TranscriptionProperty()
  transcription: string;
}
