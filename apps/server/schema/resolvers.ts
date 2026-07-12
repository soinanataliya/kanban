import {
  Board,
  board,
  Column,
  createCard,
  createColumn,
  moveCard,
  moveColumn,
  deleteCard,
  updateBoardTitle,
  resetBoard,
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
      {
        cardId,
        targetColumnId,
        dropIndex,
      }: { cardId: string; targetColumnId: string; dropIndex: number },
    ) => {
      return moveCard(cardId, targetColumnId, dropIndex);
    },
    deleteCard: (_: unknown, { cardId }: { cardId: string }) => {
      return deleteCard(cardId);
    },
    updateBoardTitle: (_: unknown, { title }: { title: string }) => {
      return updateBoardTitle(title);
    },
    moveColumn: (
      _: unknown,
      { columnId, targetIndex }: { columnId: string; targetIndex: number },
    ) => {
      return moveColumn(columnId, targetIndex);
    },
    resetBoard: () => {
      return resetBoard();
    },
  },
};
