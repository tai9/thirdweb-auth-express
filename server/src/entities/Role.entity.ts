import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity, IRole, Permission, User } from ".";

@Entity({
  name: "roles",
  orderBy: {
    createdAt: "DESC",
  },
})
export class Role extends BaseEntity implements IRole {
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

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "createdBy" })
  @Column({
    type: "varchar",
    nullable: true,
  })
  createdBy: number;

  @OneToMany(() => Permission, (perm) => perm.id)
  @JoinColumn({ name: "permissionIds" })
  @Column({
    type: "int",
    array: true,
    nullable: true,
  })
  permissionIds: number[];
}
