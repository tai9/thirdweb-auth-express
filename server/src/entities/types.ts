import { IBaseEntity } from "./Base.entity";

export interface IUser extends IBaseEntity {
  id: number;
  name: string;
  walletAddress: string;
}
