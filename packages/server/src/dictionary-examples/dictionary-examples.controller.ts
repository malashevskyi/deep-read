import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { DictionaryExamplesService } from './dictionary-examples.service';
import { CreateDictionaryExampleDto } from './dto/create-dictionary-example.dto';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { CreateDictionaryExampleDocs } from './decorators/create-dictionary-example.docs.decorator';
import { DictionaryExample } from './entities/dictionary-example.entity';

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
