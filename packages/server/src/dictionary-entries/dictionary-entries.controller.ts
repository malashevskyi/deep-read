import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { CreateDictionaryEntryDocs } from './decorators/create-dictionary-entry.docs.decorator';
import { CreateWithExampleDocs } from './decorators/create-with-example.docs.decorator';
import { DictionaryEntriesService } from './dictionary-entries.service';
import { CreateDictionaryEntryDto } from './dto/create-dictionary-entry.dto';
import { CreateEntryWithExampleDto } from './dto/create-entry-with-example.dto';
import { GetDictionaryEntryDocs } from './decorators/get-dictionary-entry.docs.decorator';
import {
  CreateEntryWithExampleResponseType,
  FindOrCreateDictionaryEntryResponseType,
  GetDictionaryEntryWithExamplesByTextResponseType,
} from '@deep-read/types/lib/deep-read/dictionary-entries';

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

  @Get(':text')
  @GetDictionaryEntryDocs()
  async getEntryWithExamples(
    @Param('text') text: string,
     
  ): Promise<GetDictionaryEntryWithExamplesByTextResponseType | null> {
    return this.dictionaryEntriesService.getEntryWithExamplesByText(text);
  }
}
