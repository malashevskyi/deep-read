import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const CreateDictionaryEntrySchema = z
  .object({
    text: z.string().min(1, 'Text cannot be empty.'),
    transcription: z.string(),
  })
  .strict();

export class CreateDictionaryEntryDto extends createZodDto(
  CreateDictionaryEntrySchema,
) {
  @ApiProperty({
    example: 'ubiquitous',
    description: 'The word or phrase to save to the dictionary.',
  })
  text: string;

  @ApiProperty({
    example: '[juːˈbɪkwɪtəs]',
    description: 'Phonetic transcription of the word.',
  })
  transcription: string;
}
