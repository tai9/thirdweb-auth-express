export interface IBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DataWithPagination<T> = {
  data: T[];
  count: number;
};
