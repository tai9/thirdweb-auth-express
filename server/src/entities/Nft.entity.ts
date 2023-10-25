import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity, INft, NftStatus, Transaction, User } from ".";

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
    type: "int",
    nullable: true,
  })
  @ManyToOne(() => User)
  @JoinColumn({
    name: "owner",
  })
  owner: User;

  @Column({
    type: "int",
    nullable: true,
  })
  @ManyToOne(() => User)
  @JoinColumn({
    name: "createdBy",
  })
  createdBy: User;

  @OneToMany(() => Transaction, (transaction) => transaction.nft)
  transactions: Transaction[];
}
