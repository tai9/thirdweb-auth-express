import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity, INft, NftStatus, User } from ".";

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
    type: "integer",
  })
  status: NftStatus;

  @Column({
    type: "varchar",
    nullable: true,
  })
  @OneToOne(() => User)
  @JoinColumn({
    name: "owner",
  })
  owner: number;

  @Column({
    type: "varchar",
    nullable: true,
  })
  @OneToOne(() => User)
  @JoinColumn({
    name: "createdBy",
  })
  createdBy: number;
}
