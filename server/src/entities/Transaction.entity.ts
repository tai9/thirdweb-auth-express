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

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "owner" })
  @Column({
    type: "int",
    nullable: true,
  })
  owner: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "buyer" })
  @Column({
    type: "int",
    nullable: true,
  })
  buyer: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "createdBy" })
  @Column({
    type: "int",
    nullable: true,
  })
  createdBy: number;

  @ManyToOne(() => Nft, (nft) => nft.id)
  @JoinColumn({ name: "nftId" })
  @Column({
    type: "int",
    nullable: true,
  })
  nftId: number;
}
