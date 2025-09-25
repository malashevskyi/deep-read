import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const AnalyzeTextDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Analyzes a piece of text to provide an explanation.',
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Successfully analyzed the text.',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad Request. The "text" field is invalid.',
    }),
  );
};
