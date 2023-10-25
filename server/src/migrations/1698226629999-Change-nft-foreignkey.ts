import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class ChangeNftForeignkey1698226629999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const nftTable = await queryRunner.getTable("nfts");
    const foreignKey1 = nftTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("createdBy") !== -1
    );
    const foreignKey2 = nftTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("owner") !== -1
    );

    foreignKey1 && (await queryRunner.dropForeignKey("nfts", foreignKey1));
    foreignKey2 && (await queryRunner.dropForeignKey("nfts", foreignKey2));

    await queryRunner.createForeignKey(
      "nfts",
      new TableForeignKey({
        columnNames: ["createdBy"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "nfts",
      new TableForeignKey({
        columnNames: ["owner"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const nftTable = await queryRunner.getTable("nfts");
    const foreignKey1 = nftTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("createdBy") !== -1
    );
    const foreignKey2 = nftTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("owner") !== -1
    );

    const constraints = nftTable.uniques.filter(
      (fk) =>
        fk.columnNames.indexOf("owner") !== -1 ||
        fk.columnNames.indexOf("createdBy") !== -1
    );

    await queryRunner.dropForeignKey("nfts", foreignKey1);
    await queryRunner.dropForeignKey("nfts", foreignKey2);
    await queryRunner.dropUniqueConstraints("nfts", constraints);
  }
}
