import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDictionaryExamplesTableAndAddDictionaryEntryRelation1759891794910
  implements MigrationInterface
{
  name =
    'CreateDictionaryExamplesTableAndAddDictionaryEntryRelation1759891794910';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dictionary_examples" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "example" text NOT NULL, "translation" text NOT NULL, "accent" text NOT NULL, "accent_translation" character varying NOT NULL, "accent_transcription" character varying NOT NULL, "dictionary_entry_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_65f4e060d5103026f6fac9193ae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2e79fe375737d4075a3968d7bd" ON "dictionary_examples" ("dictionary_entry_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "dictionary_examples" ADD CONSTRAINT "FK_2e79fe375737d4075a3968d7bda" FOREIGN KEY ("dictionary_entry_id") REFERENCES "dictionary_entries"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dictionary_examples" DROP CONSTRAINT "FK_2e79fe375737d4075a3968d7bda"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2e79fe375737d4075a3968d7bd"`,
    );
    await queryRunner.query(`DROP TABLE "dictionary_examples"`);
  }
}
