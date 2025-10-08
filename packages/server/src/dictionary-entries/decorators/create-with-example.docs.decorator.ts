import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateEntryWithExampleDto } from '../dto/create-entry-with-example.dto';

export const CreateWithExampleDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Creates a dictionary entry with its first example.',
      description:
        'Atomically finds/creates a dictionary entry, creates an example for it, and links it to an audio record.',
    }),
    ApiBody({ type: CreateEntryWithExampleDto }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The entry and example were successfully created.',
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
