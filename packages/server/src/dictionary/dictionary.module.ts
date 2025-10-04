import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { DictionaryUnit } from './entities/dictionary-unit.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryUnit])],
  providers: [DictionaryService],
  controllers: [DictionaryController],
})
export class DictionaryModule {}
