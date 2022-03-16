import { v4 as uuid } from "uuid";

export const columnsServer = (cards: any) => {
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
