import { v4 as uuid } from "uuid";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

export const columnsFromBackend = {
  [uuid()]: {
    name: "Past Launches",
    items: [],
  },
  [uuid()]: {
    name: "Launches",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "My Launches",
    items: [],
  },
};

export const columnsFn = (cards: any) => {
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
