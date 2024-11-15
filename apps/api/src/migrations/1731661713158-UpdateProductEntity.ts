import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProductEntity1731661713158 implements MigrationInterface {
    name = 'UpdateProductEntity1731661713158';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Step 1: Add the images column (nullable initially)
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "images" json
        `);

        // Step 2: Update the existing rows with a default empty array
        await queryRunner.query(`
            UPDATE "product"
            SET "images" = '[]'
            WHERE "images" IS NULL
        `);

        // Step 3: Alter the images column to be NOT NULL with a default empty array
        await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "images" SET NOT NULL
        `);

        // Step 4: Add other necessary columns or constraints
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "modified_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "sellerId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "categoryId" integer
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert the column changes (in case of rollback)
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "sellerId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "modified_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "images"`);
    }
}
