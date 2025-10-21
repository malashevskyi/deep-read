import { forwardRef, Module } from '@nestjs/common';
import { AudioRecordsService } from './audio-records.service.js';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module.js';
import { AudioRecord } from './entities/audio-record.entity.js';
import { DictionaryEntriesModule } from '../dictionary-entries/dictionary-entries.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([AudioRecord]),
    forwardRef(() => DictionaryEntriesModule),
  ],
  providers: [AudioRecordsService],
  exports: [AudioRecordsService],
})
export class AudioRecordsModule {}
