import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnalyzeTextDto } from '../dto/analyze-text.dto.js';

export const AnalyzeTextDocs = () => {
  return applyDecorators(
    ApiBody({ type: AnalyzeTextDto }),
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
