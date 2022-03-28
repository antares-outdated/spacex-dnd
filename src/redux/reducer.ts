import { ActionType, ColumnsType } from "../types";
import { TYPES } from "./actionTypes";

const initialState: ColumnsType = {
  "0": {
    name: "Past Launches",
    items: [],
  },
  "1": {
    name: "Launches",
    items: [],
  },
  "2": {
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
