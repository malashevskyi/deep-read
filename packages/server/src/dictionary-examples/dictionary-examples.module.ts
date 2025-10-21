import { Module } from '@nestjs/common';
import { DictionaryExamplesService } from './dictionary-examples.service.js';
import { DictionaryExamplesController } from './dictionary-examples.controller.js';
import { DictionaryExample } from './entities/dictionary-example.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryExample])],
  providers: [DictionaryExamplesService],
  controllers: [DictionaryExamplesController],
})
export class DictionaryExamplesModule {}
