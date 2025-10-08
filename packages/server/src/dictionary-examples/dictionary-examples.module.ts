import { Module } from '@nestjs/common';
import { DictionaryExamplesService } from './dictionary-examples.service';
import { DictionaryExamplesController } from './dictionary-examples.controller';

@Module({
  providers: [DictionaryExamplesService],
  controllers: [DictionaryExamplesController],
})
export class DictionaryExamplesModule {}
