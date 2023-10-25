import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNftStatusType1698218064236 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE nfts ALTER COLUMN status TYPE integer USING status::integer`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE nfts ALTER COLUMN status TYPE boolean USING status::boolean`
    );
  }
}
