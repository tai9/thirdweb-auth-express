import {
  MigrationInterface,
  QueryRunner,
  Table,
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
            isNullable: true,
          },
          {
            name: "owner",
            type: "int",
            isNullable: true,
          },
          {
            name: "buyer",
            type: "int",
            isNullable: true,
          },
          {
            name: "nftId",
            type: "int",
            isNullable: false,
          },
          {
            name: "createdBy",
            type: "int",
            isNullable: false,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "('now'::text)::timestamp(6) with time zone",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "('now'::text)::timestamp(6) with time zone",
          },
        ],
      }),
      true
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

    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        columnNames: ["buyer"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        columnNames: ["owner"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
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
