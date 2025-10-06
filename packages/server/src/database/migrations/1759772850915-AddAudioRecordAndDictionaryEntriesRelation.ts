import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAudioRecordAndDictionaryEntriesRelation1759772850915
  implements MigrationInterface
{
  name = 'AddAudioRecordAndDictionaryEntriesRelation1759772850915';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audio_records" ADD "dictionary_entry_id" uuid`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_04a2d0e65977472fa5856c4d25" ON "audio_records" ("dictionary_entry_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "audio_records" ADD CONSTRAINT "FK_04a2d0e65977472fa5856c4d257" FOREIGN KEY ("dictionary_entry_id") REFERENCES "dictionary_entries"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audio_records" DROP CONSTRAINT "FK_04a2d0e65977472fa5856c4d257"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_04a2d0e65977472fa5856c4d25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audio_records" DROP COLUMN "dictionary_entry_id"`,
    );
  }
}
