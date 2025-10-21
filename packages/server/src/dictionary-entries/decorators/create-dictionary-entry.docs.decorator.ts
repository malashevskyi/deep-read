import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateDictionaryEntryDto } from '../dto/create-dictionary-entry.dto.js';
import { FindOrCreateDictionaryEntryResponseDto } from '../dto/create-dictionary-entry.response.dto.js';

export const CreateDictionaryEntryDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find an existing dictionary entry or create a new one.',
      description:
        'Accepts a word/phrase and links it to a pre-existing audio record.',
    }),
    ApiBody({ type: CreateDictionaryEntryDto }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'The dictionary entry was successfully found.',
      type: FindOrCreateDictionaryEntryResponseDto,
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The dictionary entry was successfully created.',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'The corresponding audio record was not found.',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Validation failed for the request body.',
    }),
  );
};
