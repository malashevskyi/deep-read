import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateAudioRecordSchema = z.object({
  id: z.string().min(1, 'ID cannot be empty.'),
  audioUrl: z.string().url('audioUrl must be a valid URL.'),
  storagePath: z.string().min(1, 'storagePath cannot be empty.'),
});

export class CreateAudioRecordDto extends createZodDto(
  CreateAudioRecordSchema,
) {
  @ApiProperty({
    example: 'Computer Science',
    description:
      'The unique identifier for the audio record, typically the selected text.',
  })
  id: string;

  @ApiProperty({
    example:
      'https://storage.googleapis.com/bucket-name/audio/computer_science.mp3',
    description: 'The public URL to the generated audio file.',
  })
  audioUrl: string;

  @ApiProperty({
    example: 'audio/computer_science.mp3',
    description:
      'The path to the audio file in the storage bucket, used for deletion.',
  })
  storagePath: string;
}

export type CreateAudioRecord = z.infer<typeof CreateAudioRecordSchema>;
