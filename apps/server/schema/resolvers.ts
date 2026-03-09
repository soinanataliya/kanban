import {
  Board,
  board,
  Column,
  createCard,
  createColumn,
  moveCard,
} from "../store.js";

export const resolvers = {
  Query: {
    board: () => board,
  },

  Board: {
    columns: (board: Board) => board.columns,
  },

  Column: {
    cards: (column: Column) => column.cards,
  },

  Mutation: {
    createColumn: (_: any, { title }: { title: string }) => {
      return createColumn(title);
    },
    createCard: (
      _: any,
      { columnId, title }: { columnId: string; title: string },
    ) => {
      return createCard(columnId, title);
    },
    moveCard: (
      _: unknown,
      { cardId, targetColumnId }: { cardId: string; targetColumnId: string },
    ) => {
      return moveCard(cardId, targetColumnId);
    },
  },
};
