import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDictionaryExampleSchema } from '../schemas/create-dictionary-example.schema';

export class CreateDictionaryExampleDto extends createZodDto(
  CreateDictionaryExampleSchema,
) {
  @ApiProperty({
    example: 'The internet has become ubiquitous in modern life.',
    description: 'The full example sentence in English.',
  })
  example: string;

  @ApiProperty({
    example: 'Інтернет став повсюдним у сучасному житті.',
    description: 'The Ukrainian translation of the example sentence.',
  })
  translation: string;

  @ApiProperty({
    example: 'ubiquitous',
    description: 'The specific word/phrase that is being exemplified.',
  })
  accent: string;

  @ApiProperty({
    example: 'повсюдний',
    description: 'The Ukrainian translation of the accent.',
  })
  accentTranslation: string;

  @ApiProperty({
    example: '[juːˈbɪkwɪtəs]',
    description: 'Phonetic transcription of the accent.',
  })
  accentTranscription: string;

  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description:
      'The ID of the dictionary entry to which this example belongs.',
  })
  dictionaryEntryId: string;
}
