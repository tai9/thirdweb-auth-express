import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { AuditStatus, AuditType, BaseEntity, IAuditLog, User } from ".";

@Entity({
  name: "audit_logs",
  orderBy: {
    createdAt: "DESC",
  },
})
export class AuditLog extends BaseEntity implements IAuditLog {
  @Column({
    type: "varchar",
  })
  type: AuditType;

  @Column({
    type: "varchar",
  })
  status: AuditStatus;

  @Column({
    type: "varchar",
    nullable: true,
  })
  description: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  data: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  @ManyToOne(() => User, (u) => u.id)
  @JoinColumn({
    name: "createdBy",
  })
  createdBy: number;
}
