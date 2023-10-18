import { IBaseEntity } from "./common";

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
  data?: string;
  status: AuditStatus;
  createdBy: number;
}
