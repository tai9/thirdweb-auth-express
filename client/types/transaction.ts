import { IBaseEntity } from "./common";

export type TransactionType = "MINT" | "SOLD" | "SALE" | "BURN";

export interface ITransaction extends IBaseEntity {
  txId?: number;
  nftId?: number;
  type: TransactionType;
  createdBy: number;
  price?: number;
  token?: string;
  owner?: string;
  buyer?: string;
}
