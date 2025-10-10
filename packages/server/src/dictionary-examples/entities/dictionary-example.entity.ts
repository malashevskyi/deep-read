import { DictionaryEntry } from '@/dictionary-entries/entities/dictionary-entry.entity';
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

@Entity('dictionary_examples')
@Index(['example', 'accent'], { unique: true })
export class DictionaryExample {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  example: string;

  @Column({ type: 'text' })
  translation: string;

  @Column({ type: 'text' })
  accent: string;

  @Column({ name: 'accent_translation', type: 'varchar' })
  accentTranslation: string;

  @Column({ name: 'accent_transcription', type: 'varchar' })
  accentTranscription: string;

  @Index()
  @Column({ name: 'dictionary_entry_id', type: 'uuid' })
  dictionaryEntryId: string;

  @ManyToOne(() => DictionaryEntry, (entry) => entry.examples, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dictionary_entry_id' })
  dictionaryEntry: DictionaryEntry;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: string;
}
