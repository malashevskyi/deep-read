import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AudioRecord } from './entities/audio-record.entity';
import { CreateAudioRecordDto } from './dto/create-audio-record.dto';

@Injectable()
export class AudioRecordsService {
  constructor(
    @InjectRepository(AudioRecord)
    private readonly audioRecordRepository: Repository<AudioRecord>,
  ) {}

  /**
   * Creates a new audio record.
   * Throws a ConflictException if a record with the same ID already exists.
   * @param recordData - The data for the new audio record.
   * @returns The newly created audio record entity.
   */
  async createAudioRecord(
    recordData: CreateAudioRecordDto,
  ): Promise<AudioRecord> {
    const newRecord = this.audioRecordRepository.create(recordData);
    return this.audioRecordRepository.save(newRecord);
  }

  /**
   * Finds a single audio record by its ID.
   * @param id - The ID of the audio record to find.
   * @returns The found audio record entity or null.
   */
  async findOneById(id: string): Promise<AudioRecord | null> {
    return this.audioRecordRepository.findOneBy({ id });
  }

  // TODO: Add a method to update `dictionaryId`
  // TODO: Add a method to remove old records
}
