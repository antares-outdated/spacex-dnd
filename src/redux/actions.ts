import { ColumnsType } from "../types";
import TYPES from "./actionTypes";

export const updateColumns = (columns: ColumnsType) => ({
  type: TYPES.UPDATE_COLUMNS,
  payload: columns,
});
