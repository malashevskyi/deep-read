import { createAudioRecordSchema } from '@deep-read/types/lib/deep-read/audio-records';
import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';

export class CreateAudioRecordDto extends createZodDto(
  createAudioRecordSchema,
) {
  @ApiProperty({
    example: 'Computer Science',
    description:
      'The unique identifier for the audio record, typically the selected text.',
  })
  override id: string;

  @ApiProperty({
    example:
      'https://storage.googleapis.com/bucket-name/audio/computer_science.mp3',
    description: 'The public URL to the generated audio file.',
  })
  override audioUrl: string;

  @ApiProperty({
    example: 'audio/computer_science.mp3',
    description:
      'The path to the audio file in the storage bucket, used for deletion.',
  })
  override storagePath: string;
}
