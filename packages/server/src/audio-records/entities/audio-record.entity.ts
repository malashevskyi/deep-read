import { DictionaryUnit } from '@/dictionary/entities/dictionary-unit.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity('audio_records')
export class AudioRecord {
  @PrimaryColumn('text')
  id: string;

  @Column({ name: 'audio_url', type: 'varchar' })
  audioUrl: string;

  @Column({ name: 'storage_path', type: 'varchar' })
  storagePath: string;

  @OneToOne(
    () => DictionaryUnit,
    (dictionaryEntry) => dictionaryEntry.audioRecord,
    {
      nullable: true,
    },
  )
  dictionaryUnit: DictionaryUnit;

  @Column({ name: 'audio_url_expires_at', type: 'timestamptz' })
  audioUrlExpiresAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
