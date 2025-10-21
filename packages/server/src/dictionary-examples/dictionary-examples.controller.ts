import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { DictionaryExamplesService } from './dictionary-examples.service.js';
import { CreateDictionaryExampleDto } from './dto/create-dictionary-example.dto.js';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { CreateDictionaryExampleDocs } from './decorators/create-dictionary-example.docs.decorator.js';
import { DictionaryExample } from './entities/dictionary-example.entity.js';

@ApiTags('Dictionary Examples')
@Controller('dictionary-examples')
@UsePipes(ZodValidationPipe)
export class DictionaryExamplesController {
  constructor(
    private readonly dictionaryExamplesService: DictionaryExamplesService,
  ) {}

  @Post()
  @CreateDictionaryExampleDocs()
  async createDictionaryExample(
    @Body() createDto: CreateDictionaryExampleDto,
  ): Promise<DictionaryExample> {
    return this.dictionaryExamplesService.createDictionaryExample(createDto);
  }
}
