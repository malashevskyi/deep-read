import z from 'zod';
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
  override text: z.infer<typeof createDictionaryEntrySchema.shape.text>;

  @TranscriptionProperty()
  override transcription: z.infer<
    typeof createDictionaryEntrySchema.shape.transcription
  >;
}
