import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryEntriesService } from './dictionary-entries.service.js';
import { DictionaryEntriesController } from './dictionary-entries.controller.js';
import { DictionaryEntry } from './entities/dictionary-entry.entity.js';
import { AudioRecordsModule } from '../audio-records/audio-records.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([DictionaryEntry]),
    forwardRef(() => AudioRecordsModule),
  ],
  providers: [DictionaryEntriesService],
  controllers: [DictionaryEntriesController],
})
export class DictionaryEntriesModule {}
