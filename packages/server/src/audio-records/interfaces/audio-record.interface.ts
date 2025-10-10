export interface AudioRecordType {
  id: string;
  audioUrl: string;
  storagePath: string;
  dictionaryEntryId: string | null;
  /**
   * We omit typing the ManyToOne/ForeignKey relationship here (like 'dictionaryEntry')
   * to prevent circular dependencies during Zod schema generation.
   * This practice is applied to all ManyToOne/OneToOne relations.
   * Only OneToMany collections are typed for relationship completion.
   */
  // import { DictionaryEntryType } from '@/dictionary-entries/interfaces/dictionary-entry.interface';
  // dictionaryEntry: DictionaryEntryType | null;
  /**
   * @format 'date-time'
   */
  audioUrlExpiresAt: string | null;
  /**
   * @format 'date-time'
   */
  createdAt: string;
  /**
   * @format 'date-time'
   */
  updatedAt: string;
}
