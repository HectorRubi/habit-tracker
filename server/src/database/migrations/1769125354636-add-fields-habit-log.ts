import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldsHabitLog1769125354636 implements MigrationInterface {
  name = 'AddFieldsHabitLog1769125354636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "habit_log" ADD "date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "habit_log" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "habit_log" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "habit_log" DROP COLUMN "date"`);
  }
}
