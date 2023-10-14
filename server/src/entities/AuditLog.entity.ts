import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity, IAuditLog, User } from ".";

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
  type: string;

  @Column({
    type: "varchar",
  })
  status: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  description: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  @OneToOne(() => User)
  @JoinColumn({
    name: "createdBy",
  })
  createdBy: User;
}
