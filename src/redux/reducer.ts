import { v4 as uuid } from "uuid";
import TYPES from "./actionTypes";

const initialState = {
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

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TYPES.UPDATE_COLUMNS:
      console.log(action.payload);
      return action.payload;
    case TYPES.GET_COLUMNS:
      return action.payload;
    default:
      return state;
  }
};
