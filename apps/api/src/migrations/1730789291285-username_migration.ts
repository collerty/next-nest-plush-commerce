import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class UsernameMigration1730789291285 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add 'username' column as nullable initially
    await queryRunner.addColumn(
        'user', // Ensure this is the correct table name
        new TableColumn({
          name: 'username',
          type: 'varchar',
          isNullable: true, // Temporarily allow null values
        }),
    );

    // Step 2: Update existing records to set a default value for 'username'
    await queryRunner.query(
        `UPDATE "user" SET "username" = 'default_username' WHERE "username" IS NULL`
    );

    // Step 3: Alter the column to be NOT NULL
    await queryRunner.changeColumn(
        'user',
        'username',
        new TableColumn({
          name: 'username',
          type: 'varchar',
          isNullable: false, // Now set to NOT NULL
          isUnique: true,
        }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'username'); // Rollback the changes
  }

}
