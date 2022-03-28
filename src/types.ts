export type CardType = any;

export type ColumnType = {
  name: string;
  items: CardType[];
  status: 'MY' | 'NOW' | 'PAST'
};
export type ColumnsType = {
  [key: string]: ColumnType;
};
