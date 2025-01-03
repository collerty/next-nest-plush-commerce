import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColumnUser1735885875265 implements MigrationInterface {
    name = 'AddNewColumnUser1735885875265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "profileIcon" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileIcon"`);
    }

}
