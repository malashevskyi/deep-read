import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueIndexToAudioUrl1759893088042
  implements MigrationInterface
{
  name = 'AddUniqueIndexToAudioUrl1759893088042';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_1d7a905a60ed1628f5f16a4497" ON "audio_records" ("audio_url") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1d7a905a60ed1628f5f16a4497"`,
    );
  }
}
