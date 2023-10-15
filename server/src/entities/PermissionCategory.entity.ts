import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  BaseEntity,
  IPermision,
  IPermisionCategory,
  Permission,
  User,
} from ".";

@Entity({
  name: "permission_categories",
  orderBy: {
    createdAt: "DESC",
  },
})
@Index(["name", "type"], { unique: true })
export class PermissionCategory implements IPermisionCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "varchar",
  })
  type: string;
}
