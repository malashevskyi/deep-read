import { Module } from '@nestjs/common';
import { AudioRecordsService } from './audio-records.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AudioRecord } from './entities/audio-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AudioRecord])],
  providers: [AudioRecordsService],
  exports: [AudioRecordsService],
})
export class AudioRecordsModule {}
