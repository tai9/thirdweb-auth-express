import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity, IPermision, PermissionCategory, User } from ".";

@Entity({
  name: "permissions",
  orderBy: {
    createdAt: "DESC",
  },
})
export class Permission extends BaseEntity implements IPermision {
  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  description: string;

  @Column({
    type: "boolean",
  })
  status: boolean;

  @Column({
    type: "varchar",
    array: true,
  })
  categories: PermissionCategory[];

  @OneToOne(() => User)
  @JoinColumn({
    name: "createdBy",
  })
  @Column({
    type: "varchar",
    nullable: true,
  })
  createdBy: User;
}
