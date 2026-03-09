export type MoveCardVariables = {
  cardId: string;
  fromColumnId: string;
  targetColumnId: string;
};

export type MoveCardResponse = {
  moveCard: {
    id: string;
  };
};