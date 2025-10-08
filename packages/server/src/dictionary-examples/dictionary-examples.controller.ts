import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { DictionaryExamplesService } from './dictionary-examples.service';
import { CreateDictionaryExampleDto } from './dto/create-dictionary-example.dto';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { CreateDictionaryExampleDocs } from './decorators/create-dictionary-example.docs.decorator';

@ApiTags('Dictionary Examples')
@Controller('dictionary-examples')
@UsePipes(ZodValidationPipe)
export class DictionaryExamplesController {
  constructor(
    private readonly dictionaryExamplesService: DictionaryExamplesService,
  ) {}

  @Post()
  @CreateDictionaryExampleDocs()
  async createDictionaryExample(@Body() createDto: CreateDictionaryExampleDto) {
    return this.dictionaryExamplesService.createDictionaryExample(createDto);
  }
}
