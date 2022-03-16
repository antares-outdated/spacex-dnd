import { updateColumns } from "./redux/actions";

export type CardType = any;
export type ColumnType = {
  name: string;
  items: CardType[];
};
export type ColumnsType = {
  [key: string]: ColumnType;
};

export type ActionType = ReturnType<typeof updateColumns>;
