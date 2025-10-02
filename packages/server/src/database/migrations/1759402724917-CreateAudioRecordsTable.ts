import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAudioRecordsTable1759402724917 implements MigrationInterface {
    name = 'CreateAudioRecordsTable1759402724917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "audio_records" ("id" text NOT NULL, "audio_url" character varying NOT NULL, "storage_path" character varying NOT NULL, "dictionary_id" uuid, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_ad93fbd2b1307657cab48a6abb2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "audio_records"`);
    }

}
