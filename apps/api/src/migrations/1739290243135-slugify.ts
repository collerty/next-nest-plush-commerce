import { MigrationInterface, QueryRunner } from 'typeorm';
import slugify from 'slugify';

export class AddSlugToCategoryAndUpdateExisting1739290243135
  implements MigrationInterface
{
  name = 'AddSlugToCategoryAndUpdateExisting1739290243135';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add the `slug` column
    await queryRunner.query(`ALTER TABLE "category"
            ADD "slug" character varying`);

    // Step 2: Generate slugs for existing categories
    const categories = await queryRunner.query(`SELECT id, name
                                                    FROM "category"`);

    for (const category of categories) {
      const slug = slugify(category.name, { lower: true });
      await queryRunner.query(
        `UPDATE "category"
                 SET "slug" = $1
                 WHERE "id" = $2`,
        [slug, category.id],
      );
    }

    // Step 3: Make `slug` NOT NULL and UNIQUE
    await queryRunner.query(`ALTER TABLE "category"
            ALTER COLUMN "slug" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "category"
            ADD CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70"`,
    );
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "slug"`);
  }
}
