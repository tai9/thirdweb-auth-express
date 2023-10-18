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

export interface IAuditLog extends IBaseEntity {
  type: string;
  description?: string;
  status: string;
  createdBy: IUser;
}

export interface IPermisionCategory {
  id: number;
  name: string;
  type: string;
}
