export type Card = {
  id: string;
  title: string;
  order: number;
  columnId: string;
};

export type Column = {
  id: string;
  title: string;
  order: number;
  cards: Card[];
};

export type Board = {
  id: string;
  title: string;
  columns: Column[];
};