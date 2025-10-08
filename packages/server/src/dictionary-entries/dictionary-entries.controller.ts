import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { DictionaryEntriesService } from './dictionary-entries.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateDictionaryEntryDto } from './dto/create-dictionary-entry.dto';
import { CreateDictionaryEntryDocs } from './decorators/create-dictionary-entry.docs.decorator';
import { ZodValidationPipe } from 'nestjs-zod';
import { CreateWithExampleDocs } from './decorators/create-with-example.docs.decorator';
import { CreateEntryWithExampleDto } from './dto/create-entry-with-example.dto';

@ApiTags('Dictionary')
@Controller('dictionary')
@UsePipes(ZodValidationPipe)
export class DictionaryEntriesController {
  constructor(
    private readonly dictionaryEntriesService: DictionaryEntriesService,
  ) {}

  @Post()
  @CreateDictionaryEntryDocs()
  async createDictionaryEntry(@Body() createDto: CreateDictionaryEntryDto) {
    return this.dictionaryEntriesService.findOrCreate(
      createDto.text,
      createDto.transcription,
    );
  }

  @Post('/with-example')
  @CreateWithExampleDocs()
  async createWithFirstExample(@Body() createDto: CreateEntryWithExampleDto) {
    return this.dictionaryEntriesService.createWithExample(createDto);
  }
}
