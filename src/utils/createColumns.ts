import { v4 as uuid } from "uuid";
import { CardType, ColumnsType } from "../types";

export const createColumns = (cards: CardType[]): ColumnsType => {
  return {
    [uuid()]: {
      name: "Past Launches",
      items: cards.slice(5, 8),
    },
    [uuid()]: {
      name: "Launches",
      items: cards.slice(0, 5),
    },
    [uuid()]: {
      name: "My Launches",
      items: cards.slice(8, 10),
    },
  };
};
