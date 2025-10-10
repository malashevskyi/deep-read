import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { CreateDictionaryEntryDocs } from './decorators/create-dictionary-entry.docs.decorator';
import { CreateWithExampleDocs } from './decorators/create-with-example.docs.decorator';
import { DictionaryEntriesService } from './dictionary-entries.service';
import { CreateDictionaryEntryDto } from './dto/create-dictionary-entry.dto';
import { FindOrCreateDictionaryEntryResponseType } from './dto/create-dictionary-entry.response.dto';
import { CreateEntryWithExampleDto } from './dto/create-entry-with-example.dto';
import { CreateEntryWithExampleResponseType } from './dto/create-entry-with-example.response.dto';

@ApiTags('Dictionary')
@Controller('dictionary')
@UsePipes(ZodValidationPipe)
export class DictionaryEntriesController {
  constructor(
    private readonly dictionaryEntriesService: DictionaryEntriesService,
  ) {}

  @Post()
  @CreateDictionaryEntryDocs()
  async createDictionaryEntry(
    @Body() createDto: CreateDictionaryEntryDto,
  ): Promise<FindOrCreateDictionaryEntryResponseType> {
    return this.dictionaryEntriesService.findOrCreate(
      createDto.text,
      createDto.transcription,
    );
  }

  @Post('/with-example')
  @CreateWithExampleDocs()
  async createWithFirstExample(
    @Body() createDto: CreateEntryWithExampleDto,
  ): Promise<CreateEntryWithExampleResponseType> {
    return this.dictionaryEntriesService.createWithExample(createDto);
  }
}
