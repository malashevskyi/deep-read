import { AudioRecord } from '@/audio-records/entities/audio-record.entity';
import { DictionaryExample } from '@/dictionary-examples/entities/dictionary-example.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity('dictionary_entries')
export class DictionaryEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column('text')
  text: string;

  @Column({ type: 'varchar' })
  transcription: string;

  @Column({
    name: 'pronounce_video_links',
    type: 'text',
    array: true,
    default: '{}',
  })
  pronounceVideoLinks: string[];

  @OneToMany(() => DictionaryExample, (example) => example.dictionaryEntry)
  examples: DictionaryExample[];

  @OneToMany(() => AudioRecord, (audio) => audio.dictionaryEntry)
  audioRecords: AudioRecord[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: string;
}
