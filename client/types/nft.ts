import { IBaseEntity } from "./common";

export interface INft extends IBaseEntity {
  name: string;
  description?: string;
  status: NftStatus;
  owner: number;
  createdBy: number;
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
