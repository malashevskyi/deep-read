import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateDictionaryExampleDto } from '../dto/create-dictionary-example.dto';
import { DictionaryExample } from '../entities/dictionary-example.entity';

export const CreateDictionaryExampleDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new example for a dictionary entry.',
      description:
        'Adds a new example sentence and links it to an existing dictionary entry.',
    }),
    ApiBody({ type: CreateDictionaryExampleDto }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'The example was successfully created.',
      type: DictionaryExample,
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description:
        'An example with the same sentence and accent already exists.',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Validation failed for the request body.',
    }),
  );
};
