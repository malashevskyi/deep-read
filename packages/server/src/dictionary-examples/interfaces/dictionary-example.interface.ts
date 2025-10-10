export interface DictionaryExampleType {
  /**
   * @format 'uuid'
   */
  id: string;
  example: string;
  translation: string;
  accent: string;
  accentTranslation: string;
  accentTranscription: string;
  dictionaryEntryId: string;
  /**
   * We omit typing the ManyToOne/ForeignKey relationship here (like 'dictionaryEntry')
   * to prevent circular dependencies during Zod schema generation.
   * This practice is applied to all ManyToOne/OneToOne relations.
   * Only OneToMany collections are typed for relationship completion.
   */
  // import { DictionaryEntryType } from '@/dictionary-entries/interfaces/dictionary-entry.interface';
  // dictionaryEntry: DictionaryEntryType;
  /**
   * @format 'date-time'
   */
  createdAt: string;
  /**
   * @format 'date-time'
   */
  updatedAt: string;
}
