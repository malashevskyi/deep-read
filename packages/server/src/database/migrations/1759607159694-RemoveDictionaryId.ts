import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDictionaryId1759607159694 implements MigrationInterface {
  name = 'RemoveDictionaryId1759607159694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audio_records" DROP COLUMN "dictionary_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audio_records" ADD "dictionary_id" uuid`,
    );
  }
}
