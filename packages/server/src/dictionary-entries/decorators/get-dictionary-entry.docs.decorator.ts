import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GetEntryWithExamplesByTextResponseDto } from '../dto/get-entry-with-examples-by-text.response.dto.js';

export const GetDictionaryEntryDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get a single dictionary entry by its text.',
      description:
        'Returns a full dictionary entry object, including all related examples and audio records.',
    }),
    ApiParam({
      name: 'text',
      type: 'string',
      description: 'The text of the dictionary entry to retrieve.',
      example: 'ubiquitous',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description:
        'The request was successful. The body will contain the dictionary entry object if found, or be empty/null if not found.',
      type: GetEntryWithExamplesByTextResponseDto,
    }),
  );
};
