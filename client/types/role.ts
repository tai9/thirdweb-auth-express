import { IBaseEntity } from "./common";
import { IUser } from "./user";

export interface IRole extends IBaseEntity {
  name: string;
  description?: string;
  status: boolean;
  createdBy: IUser;
  permissionIds: number[];
}
