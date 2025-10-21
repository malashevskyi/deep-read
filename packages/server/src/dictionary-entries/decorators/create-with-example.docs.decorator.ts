import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateEntryWithExampleDto } from '../dto/create-entry-with-example.dto.js';
import { CreateEntryWithExampleResponseDto } from '../dto/create-entry-with-example.response.dto.js';

export const CreateWithExampleDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary:
        'Creates a dictionary entry (if not exist) with its first example or add a new example.',
      description:
        'Atomically finds/creates a dictionary entry, creates an example for it, and links it to an audio record.',
    }),
    ApiBody({ type: CreateEntryWithExampleDto }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The entry and example were successfully created.',
      type: CreateEntryWithExampleResponseDto,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description:
        'The corresponding audio record was not found for the given text.',
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'The provided example (sentence + accent) already exists.',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Validation failed for the request body.',
    }),
  );
};
