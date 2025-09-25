import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AnalyzeTextDto {
  @ApiProperty({
    example: 'ubiquitous',
    description: 'The word or phrase to be analyzed.',
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}
