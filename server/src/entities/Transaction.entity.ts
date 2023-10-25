import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity, ITransaction, Nft, TransactionType, User } from ".";

@Entity({
  name: "transactions",
  orderBy: {
    createdAt: "DESC",
  },
})
export class Transaction extends BaseEntity implements ITransaction {
  @Column({
    type: "int",
    nullable: true,
  })
  txId: number;

  @Column({
    type: "varchar",
  })
  type: TransactionType;

  @Column({
    type: "varchar",
    nullable: true,
  })
  price: number;

  @Column({
    type: "varchar",
    nullable: true,
  })
  token: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  owner: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  buyer: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "createdBy" })
  @Column({
    type: "varchar",
    nullable: true,
  })
  createdBy: number;

  @OneToMany(() => Nft, (nft) => nft.id)
  @JoinColumn({ name: "nftId" })
  @Column({
    type: "int",
    nullable: true,
  })
  nftId: number;
}
