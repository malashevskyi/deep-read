import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const GenerateAudioSchema = z.object({ text: z.string().min(1) });

export class GenerateAudioDto extends createZodDto(GenerateAudioSchema) {
  @ApiProperty({
    example: 'ubiquitous',
    description: 'The text to synthesize audio for.',
  })
  text: string;
}
