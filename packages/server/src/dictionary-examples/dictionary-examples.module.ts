import { Module } from '@nestjs/common';
import { DictionaryExamplesService } from './dictionary-examples.service';
import { DictionaryExamplesController } from './dictionary-examples.controller';
import { DictionaryExample } from './entities/dictionary-example.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryExample])],
  providers: [DictionaryExamplesService],
  controllers: [DictionaryExamplesController],
})
export class DictionaryExamplesModule {}
