import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity, IUser, Role } from ".";

@Entity("users")
export class User extends BaseEntity implements IUser {
  @Column({
    type: "varchar",
    nullable: true,
  })
  name: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  walletAddress: string;

  @OneToMany(() => Role, (role) => role.createdBy)
  @JoinColumn()
  roles: Role[];
}
