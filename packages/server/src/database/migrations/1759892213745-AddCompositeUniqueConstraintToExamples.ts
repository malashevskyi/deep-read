import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompositeUniqueConstraintToExamples1759892213745
  implements MigrationInterface
{
  name = 'AddCompositeUniqueConstraintToExamples1759892213745';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_5a6245ccf3076f171e9d28d262" ON "dictionary_examples" ("example", "accent") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5a6245ccf3076f171e9d28d262"`,
    );
  }
}
