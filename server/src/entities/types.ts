import { IBaseEntity } from "./Base.entity";

export interface IUser extends IBaseEntity {
  name: string;
  walletAddress: string;
}

export enum PermissionType {
  READ = "READ",
  DELETE = "DELETE",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

export interface IPermision extends IBaseEntity {
  name: string;
  status: boolean;
  description?: string;
  // categories: PermissionType[];
  createdBy: IUser;
}

export interface IRole extends IBaseEntity {
  name: string;
  description?: string;
  status: boolean;
  createdBy: number;
  permissionIds: number[];
}

export enum NftStatus {
  "NOT_ON_SALE" = 1,
  "LISTED",
  "BURNED",
}

export interface INft extends IBaseEntity {
  name: string;
  description?: string;
  status: NftStatus;
  owner: IUser;
  createdBy: IUser;
  transactions?: ITransaction[];
  lastTransaction?: ITransaction;
}

export type AuditType =
  | "USER"
  | "ROLE"
  | "NFT"
  | "PERMISSION"
  | "LOGIN"
  | "LOGOUT";

export type AuditStatus = "SUCCESS" | "FAIL";

export interface IAuditLog extends IBaseEntity {
  type: AuditType;
  description?: string;
  status: AuditStatus;
  createdBy: number;
  data?: string;
}

export interface IPermisionCategory {
  id: number;
  name: string;
  type: string;
}

export type TransactionType = "MINT" | "SOLD" | "SALE" | "BURN" | "CANCELED";

export interface ITransaction extends IBaseEntity {
  txId?: number;
  nftId?: number;
  type: TransactionType;
  createdBy: IUser;
  price?: number;
  token?: string;
  owner?: IUser;
  buyer?: IUser;
  nft?: INft;
}
