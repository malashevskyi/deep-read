import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictionaryExample } from './entities/dictionary-example.entity';
import { CreateDictionaryExampleDto } from './dto/create-dictionary-example.dto';
import { ErrorService } from '../errors/errors.service';
import { AppErrorCode } from '../shared/exceptions/AppErrorCode';

@Injectable()
export class DictionaryExamplesService {
  constructor(
    @InjectRepository(DictionaryExample)
    private readonly exampleRepository: Repository<DictionaryExample>,
    private readonly errorService: ErrorService,
  ) {}

  /**
   * Creates a new example for a dictionary entry.
   * Prevents creation of duplicate examples (same sentence + same accent).
   * @param dto - The data for the new example.
   * @returns The newly created example entity.
   * @throws {ConflictException} If the example already exists.
   */
  async createDictionaryExample(
    dto: CreateDictionaryExampleDto,
  ): Promise<DictionaryExample> {
    const existingExample = await this.exampleRepository.findOneBy({
      example: dto.example,
      accent: dto.accent,
    });

    if (existingExample) {
      this.errorService.handle(
        AppErrorCode.CONFLICT_EXCEPTION,
        `Example for accent "${dto.accent}" in sentence "${dto.example}" already exists.`,
        null,
        HttpStatus.CONFLICT,
      );
    }

    const newExample = this.exampleRepository.create(dto);

    return this.exampleRepository.save(newExample);
  }
}
