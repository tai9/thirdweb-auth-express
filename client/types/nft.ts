import { IBaseEntity } from "./common";
import { ITransaction } from "./transaction";
import { IUser } from "./user";

export interface INft extends IBaseEntity {
  name: string;
  description?: string;
  status: NftStatus;
  owner: IUser;
  createdBy: IUser;
  transactions?: ITransaction[];
  lastTransaction?: ITransaction;
}

export enum NftStatus {
  "NOT_ON_SALE" = 1,
  "LISTED",
  "BURNED",
}

export const NFT_STATUS = {
  [NftStatus.NOT_ON_SALE]: "NOT ON SALE",
  [NftStatus.LISTED]: "LISTED",
  [NftStatus.BURNED]: "BURNED",
};
