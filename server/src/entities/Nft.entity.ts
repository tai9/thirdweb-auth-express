import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity, INft, User } from ".";

@Entity({
  name: "nfts",
  orderBy: {
    createdAt: "DESC",
  },
})
export class Nft extends BaseEntity implements INft {
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
    nullable: true,
  })
  @OneToOne(() => User)
  @JoinColumn({
    name: "owner",
  })
  owner: User;

  @Column({
    type: "varchar",
    nullable: true,
  })
  @OneToOne(() => User)
  @JoinColumn({
    name: "createdBy",
  })
  createdBy: User;
}
