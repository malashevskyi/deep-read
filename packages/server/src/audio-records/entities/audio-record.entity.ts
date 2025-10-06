import { DictionaryEntry } from '@/dictionary-entries/entities/dictionary-entry.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('audio_records')
export class AudioRecord {
  @PrimaryColumn('text')
  id: string;

  @Column({ name: 'audio_url', type: 'varchar' })
  audioUrl: string;

  @Column({ name: 'storage_path', type: 'varchar' })
  storagePath: string;

  @Index()
  @Column({ name: 'dictionary_entry_id', type: 'uuid', nullable: true })
  dictionaryEntryId: string;

  @ManyToOne(() => DictionaryEntry, (entry) => entry.audioRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dictionary_entry_id' })
  dictionaryEntry: DictionaryEntry;

  @Column({ name: 'audio_url_expires_at', type: 'timestamptz', nullable: true })
  audioUrlExpiresAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
