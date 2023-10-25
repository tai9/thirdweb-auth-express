import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNftFkToTransaction1698245561108 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE "transactions"
    ADD CONSTRAINT "FK_nft_id"
    FOREIGN KEY ("nftId")
    REFERENCES "nfts"("id")
    ON DELETE CASCADE;
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE "transaction"
    DROP CONSTRAINT "FK_nft_id";
  `);
  }
}
