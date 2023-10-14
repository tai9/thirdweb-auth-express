import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity, IRole, User } from ".";

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

  @OneToOne(() => User)
  @JoinColumn({ name: "createdBy" })
  @Column({
    type: "varchar",
    nullable: true,
  })
  createdBy: User;
}
