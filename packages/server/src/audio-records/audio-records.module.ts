import { forwardRef, Module } from '@nestjs/common';
import { AudioRecordsService } from './audio-records.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AudioRecord } from './entities/audio-record.entity';
import { DictionaryEntriesModule } from '@/dictionary-entries/dictionary-entries.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AudioRecord]),
    forwardRef(() => DictionaryEntriesModule),
  ],
  providers: [AudioRecordsService],
  exports: [AudioRecordsService],
})
export class AudioRecordsModule {}
