import { AudioRecord } from '@/audio-records/entities/audio-record.entity';
import { DictionaryExample } from '@/dictionary-examples/entities/dictionary-example.entity';
import { GetDictionaryExampleResponseType } from '@/dictionary-examples/schemas/get-dictionary-example.response.schema';
import { ErrorService } from '@/errors/errors.service';
import { AppErrorCode } from '@/shared/exceptions/AppErrorCode';
import { Injectable, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZodValidationPipe } from 'nestjs-zod';
import { DataSource, Repository } from 'typeorm';
import { AudioRecordsService } from '../audio-records/audio-records.service';
import { DictionaryEntry } from './entities/dictionary-entry.entity';
import { FindOrCreateDictionaryEntryResponseDto } from './dto/create-dictionary-entry.response.dto';
import { CreateEntryWithExampleDto } from './dto/create-entry-with-example.dto';
import { CreateEntryWithExampleResponseType } from './dto/create-entry-with-example.response.dto';
import FindOrCreateDictionaryEntryResponseSchema from './schemas/find-or-create-dictionary-entry.response.schema';
import { FindOrCreateDictionaryEntryResponseType } from './dto/create-dictionary-entry.response.dto';

@Injectable()
@UsePipes(ZodValidationPipe)
export class DictionaryEntriesService {
  constructor(
    @InjectRepository(DictionaryEntry)
    private readonly dictionaryEntriesRepository: Repository<DictionaryEntry>,
    private readonly audioRecordsService: AudioRecordsService,
    private readonly dataSource: DataSource,
    private readonly errorService: ErrorService,
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
  ): Promise<FindOrCreateDictionaryEntryResponseType> {
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

  /**
   * Orchestrates the creation of a dictionary entry with its first example
   * and links it to an existing audio record within a single transaction.
   * @param dto {@link CreateEntryWithExampleDto}
   * @returns The newly created entry with its relations.
   */
  async createWithExample(
    dto: CreateEntryWithExampleDto,
  ): Promise<CreateEntryWithExampleResponseType> {
    const createdOrUpdateEntry = await this.dataSource.transaction(
      async (manager) => {
        const { text, transcription, example } = dto;

        const audioRecord =
          await this.audioRecordsService.findOneByIdOrThrow(text);

        let entry = await manager.findOne(DictionaryEntry, { where: { text } });
        if (!entry) {
          const newEntry = manager.create(DictionaryEntry, {
            text,
            transcription,
          });
          entry = await manager.save(newEntry);
        }

        await manager.update(
          AudioRecord,
          { id: audioRecord.id },
          { dictionaryEntryId: entry.id },
        );

        let exampleEntity = await manager.findOne(DictionaryExample, {
          where: {
            example: example.example,
            accent: example.accent,
          },
        });

        if (!exampleEntity) {
          const newExample = manager.create(DictionaryExample, {
            ...example,
            dictionaryEntryId: entry.id,
          });
          exampleEntity = await manager.save(newExample);
        }

        return manager.findOne(DictionaryEntry, {
          where: { id: entry.id },
          relations: {
            audioRecords: true,
            examples: true,
          },
          order: {
            examples: {
              createdAt: 'DESC',
            },
          },
        });
      },
    );

    if (!entryWithRelations) {
      this.errorService.handle(
        AppErrorCode.UNKNOWN_ERROR,
        'Failed to retrieve entry after transaction.',
        null,
      );
    }

    const translations = new Set(
      entryWithRelations.examples.map((ex) => ex.accentTranslation),
    );
    const aggregatedTranslation = Array.from(translations).join(', ');

    return CreateDictionaryEntryWithExampleResponseSchema.parse({
      id: entryWithRelations.id,
      text: entryWithRelations.text,
      transcription: entryWithRelations.transcription,
      pronounceVideoLinks: entryWithRelations.pronounceVideoLinks,
      createdAt: entryWithRelations.createdAt,
      updatedAt: entryWithRelations.updatedAt,
      audioRecords: entryWithRelations.audioRecords.map((ar) => ar.audioUrl),
      examples: entryWithRelations.examples,
      translation: aggregatedTranslation,
    });
  }
}
