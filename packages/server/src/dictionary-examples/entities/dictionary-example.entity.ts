import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

import {
  AccentProperty,
  AccentTranscriptionProperty,
  AccentTranslationProperty,
  CreatedAtProperty,
  DictionaryEntriesProperty,
  DictionaryEntryIdProperty,
  ExampleProperty,
  IdProperty,
  TranslationProperty,
  UpdatedAtProperty,
} from '../decorators/dictionary-example-fields.decorators';
import type { DictionaryExampleType } from '@deep-read/types/lib/deep-read/dictionary-examples';
import { DictionaryEntry } from '../../dictionary-entries/entities/dictionary-entry.entity';

@Entity('dictionary_examples')
@Index(['example', 'accent'], { unique: true })
export class DictionaryExample implements DictionaryExampleType {
  @IdProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ExampleProperty()
  @Column({ type: 'text' })
  example: string;

  @TranslationProperty()
  @Column({ type: 'text' })
  translation: string;

  @AccentProperty()
  @Column({ type: 'text' })
  accent: string;

  @AccentTranslationProperty()
  @Column({ name: 'accent_translation', type: 'varchar' })
  accentTranslation: string;

  @AccentTranscriptionProperty()
  @Column({ name: 'accent_transcription', type: 'varchar' })
  accentTranscription: string;

  @DictionaryEntryIdProperty()
  @Index()
  @Column({ name: 'dictionary_entry_id', type: 'uuid' })
  dictionaryEntryId: string;

  @DictionaryEntriesProperty()
  @ManyToOne(() => DictionaryEntry, (entry) => entry.examples, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dictionary_entry_id' })
  dictionaryEntry: DictionaryEntry;

  @CreatedAtProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: string;

  @UpdatedAtProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: string;
}
