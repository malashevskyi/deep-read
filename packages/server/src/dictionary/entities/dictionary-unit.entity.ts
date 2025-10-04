import { AudioRecord } from '@/audio-records/entities/audio-record.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('dictionary_entries')
export class DictionaryUnit {
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

  @Index()
  @Column({ name: 'audio_record_id', type: 'text' })
  audioRecordId: string;

  @OneToOne(() => AudioRecord, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'audio_record_id' })
  audioRecord: AudioRecord;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
