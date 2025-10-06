import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDictionaryEntryEntity1759752373352
  implements MigrationInterface
{
  name = 'AddDictionaryEntryEntity1759752373352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dictionary_entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "transcription" character varying NOT NULL, "pronounce_video_links" text array NOT NULL DEFAULT '{}', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_47cac68f15abb2d1caa183960fd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_01c39e52d1623492efee9fe00e" ON "dictionary_entries" ("text") `,
    );
    await queryRunner.query(
      `ALTER TABLE "audio_records" DROP COLUMN "dictionary_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audio_records" ADD "dictionary_id" uuid`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_01c39e52d1623492efee9fe00e"`,
    );
    await queryRunner.query(`DROP TABLE "dictionary_entries"`);
  }
}
