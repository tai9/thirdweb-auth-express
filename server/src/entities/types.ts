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

export interface INft extends IBaseEntity {
  name: string;
  description?: string;
  status: boolean;
  owner: IUser;
  createdBy: IUser;
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
