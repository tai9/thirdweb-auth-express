import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateTransactionTable1698220869166 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
          },
          {
            name: "txId",
            type: "int",
            isNullable: true,
          },
          {
            name: "type",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "price",
            type: "int",
            isNullable: true,
          },
          {
            name: "token",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "owner",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "buyer",
            type: "varchar",
            isNullable: false,
          },
        ],
      }),
      true
    );

    await queryRunner.addColumn(
      "transactions",
      new TableColumn({
        name: "createdBy",
        type: "int",
      })
    );

    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        columnNames: ["createdBy"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.addColumn(
      "transactions",
      new TableColumn({
        name: "nftId",
        type: "int",
      })
    );

    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        columnNames: ["nftId"],
        referencedColumnNames: ["id"],
        referencedTableName: "nfts",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions");
  }
}
