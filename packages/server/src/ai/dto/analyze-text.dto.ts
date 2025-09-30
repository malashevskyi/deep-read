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

  @ApiProperty({
    example: 'The internet has become ubiquitous in modern society.',
    description: 'Context or sentence where the word or phrase is used.',
  })
  @IsString()
  @IsNotEmpty()
  context: string;
}
