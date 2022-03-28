/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateColumns } from "./redux/actions";

export type CardType = any;

export type ColumnType = {
  name: string;
  items: CardType[];
  status: 'MY' | 'NOW' | 'PAST'
};
export type ColumnsType = {
  [key: string]: ColumnType;
};

export type ActionType = ReturnType<typeof updateColumns>;
