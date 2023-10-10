import { Column, Entity } from "typeorm";
import { BaseEntity, IUser } from ".";

@Entity("users")
export class User extends BaseEntity implements IUser {
  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "varchar",
  })
  walletAddress: string;
}
