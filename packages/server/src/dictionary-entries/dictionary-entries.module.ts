import { forwardRef, Module } from '@nestjs/common';
import { DictionaryEntriesService } from './dictionary-entries.service';
import { DictionaryEntriesController } from './dictionary-entries.controller';
import { DictionaryEntry } from './entities/dictionary-entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AudioRecordsModule } from '../audio-records/audio-records.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DictionaryEntry]),
    forwardRef(() => AudioRecordsModule),
  ],
  providers: [DictionaryEntriesService],
  controllers: [DictionaryEntriesController],
})
export class DictionaryEntriesModule {}
