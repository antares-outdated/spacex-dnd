import TYPES from "./actionTypes";

export const updateColumns = (columns: any) => ({
  type: TYPES.UPDATE_COLUMNS,
  payload: columns,
});
export const fetchColumns = (columns: any) => ({
  type: TYPES.GET_COLUMNS,
  payload: columns,
});
