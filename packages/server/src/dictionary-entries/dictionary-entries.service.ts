import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AudioRecordsService } from '../audio-records/audio-records.service';
import { DictionaryEntry } from './entities/dictionary-entry.entity';
import {
  FindOrCreateDictionaryEntryResponseDto,
  FindOrCreateDictionaryEntryResponseSchema,
} from './dto/create-dictionary-entry.response.dto';

@Injectable()
export class DictionaryEntriesService {
  constructor(
    @InjectRepository(DictionaryEntry)
    private readonly dictionaryEntriesRepository: Repository<DictionaryEntry>,
    private readonly audioRecordsService: AudioRecordsService,
  ) {}

  /**
   * Finds a dictionary entry by its text content. If not found, creates a new entry
   * after verifying that a corresponding audio record exists.
   * @param text - The text of the word or phrase.
   * @param transcription - The phonetic transcription of the text.
   */
  async findOrCreate(
    text: string,
    transcription: string,
  ): Promise<FindOrCreateDictionaryEntryResponseDto> {
    let existingEntry = await this.dictionaryEntriesRepository.findOne({
      where: { text },
    });

    const audioRecord = await this.audioRecordsService.findOneByIdOrThrow(text);

    if (!existingEntry) {
      const newEntry = this.dictionaryEntriesRepository.create({
        text,
        transcription,
      });
      existingEntry = await this.dictionaryEntriesRepository.save(newEntry);
    }

    await this.audioRecordsService.createOrUpdateAudioRecord({
      id: text,
      dictionaryEntryId: existingEntry.id,
    });

    return FindOrCreateDictionaryEntryResponseSchema.parse({
      ...existingEntry,
      audioRecords: [audioRecord.audioUrl],
    });
  }
}
