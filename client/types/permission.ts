import { IBaseEntity } from "./common";
import { IUser } from "./user";

export interface IPermission extends IBaseEntity {
  name: string;
  status: boolean;
  description?: string;
  categories: number[];
  createdBy: IUser;
}
