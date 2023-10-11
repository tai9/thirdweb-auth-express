import { IBaseEntity } from "./common";

export interface IUser extends IBaseEntity {
  id: number;
  name: string;
  walletAddress: string;
}
