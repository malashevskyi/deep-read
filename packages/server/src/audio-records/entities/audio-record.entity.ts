import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('audio_records')
export class AudioRecord {
  @PrimaryColumn('text')
  id: string;

  @Column({ name: 'audio_url', type: 'varchar' })
  audioUrl: string;

  @Column({ name: 'storage_path', type: 'varchar' })
  storagePath: string;

  // The field for linking to the dictionary.
  // We are not creating a real relation yet,
  // as the Dictionary entity does not exist yet.
  @Column({ name: 'dictionary_id', type: 'uuid', nullable: true })
  dictionaryId: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
