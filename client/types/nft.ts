import { IBaseEntity } from "./common";
import { IUser } from "./user";

export interface INft extends IBaseEntity {
  name: string;
  description?: string;
  status: NftStatus;
  owner: IUser;
  createdBy: IUser;
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
