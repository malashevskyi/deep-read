import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAudioUrlExpiresAtColumn1759509286445
  implements MigrationInterface
{
  name = 'AddAudioUrlExpiresAtColumn1759509286445';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audio_records" ADD "audio_url_expires_at" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audio_records" DROP COLUMN "audio_url_expires_at"`,
    );
  }
}
