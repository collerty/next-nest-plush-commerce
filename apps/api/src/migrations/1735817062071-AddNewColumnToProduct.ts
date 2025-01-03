import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColumnToProduct1735817062071 implements MigrationInterface {
    name = 'AddNewColumnToProduct1735817062071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "rating" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "rating"`);
    }

}
