import { IBaseEntity } from "./common";
import { INft } from "./nft";
import { IUser } from "./user";

export type TransactionType = "MINT" | "SOLD" | "SALE" | "BURN";

export interface ITransaction extends IBaseEntity {
  txId?: number;
  nftId?: number;
  type: TransactionType;
  createdBy: IUser;
  price?: number;
  token?: string;
  owner?: IUser;
  buyer?: IUser;
  nft: INft;
}
