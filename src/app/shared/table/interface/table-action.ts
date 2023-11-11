import { TABLE_ACTION } from '@shared/table/enum/table-action';

export interface TableAction<T = any> {
  action: TABLE_ACTION;
  row: T;
}
