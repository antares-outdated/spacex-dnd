import { v4 as uuid } from "uuid";
import { ActionType, ColumnsType } from "../types";
import TYPES from "./actionTypes";

const initialState: ColumnsType = {
  [uuid()]: {
    name: "Past Launches",
    items: [],
  },
  [uuid()]: {
    name: "Launches",
    items: [],
  },
  [uuid()]: {
    name: "My Launches",
    items: [],
  },
};

export const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case TYPES.UPDATE_COLUMNS:
      return action.payload;
    default:
      return state;
  }
};
