import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPermissionCategory1697343936295 implements MigrationInterface {
  readonly permissionTypes = [
    {
      name: "USER",
      types: ["CREATE", "UPDATE", "READ", "READ_ALL", "DELETE"],
    },
    {
      name: "ROLE",
      types: ["CREATE", "UPDATE", "READ", "READ_ALL", "DELETE"],
    },
    {
      name: "NFT",
      types: ["CREATE", "UPDATE", "READ", "READ_ALL", "DELETE", "BUY", "SELL"],
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const { name, types } of this.permissionTypes) {
      const values = types.map((item) => ({
        name,
        type: item,
      }));
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into("permission_categories")
        .values(values)
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DELETE FROM permission_categories;`);
  }
}
