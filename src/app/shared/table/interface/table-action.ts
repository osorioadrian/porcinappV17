import { TABLE_ACTION } from '../enum/table-action';

export interface TableAction<T = any> {
  action: TABLE_ACTION;
  row: T;
}
