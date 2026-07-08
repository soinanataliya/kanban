const uid = () => {
  return crypto.randomUUID();
};

export type Card = {
  id: string;
  title: string;
  description?: string;
  order: number;
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

export const board: Board = {
  id: "board-1",
  title: "My Kanban Board",
  columns: [],
};

export function createColumn(title: string) {
  const column: Column = {
    id: uid(),
    title,
    order: board.columns.length,
    cards: [],
  };
  board.columns.push(column);
  return column;
}

export function createCard(columnId: string, title: string) {
  const column = board.columns.find((col) => col.id === columnId);
  if (!column) throw new Error("Column not found");

  const card: Card = {
    id: uid(),
    title,
    order: column.cards.length,
  };

  column.cards.push(card);
  return card;
}

export function seedBoard() {
  if (board.columns.length > 0) {
    return; // for hot-reload
  }

  const todo = createColumn("Todo");
  const inProgress = createColumn("In Progress");
  const done = createColumn("Done");

  createCard(todo.id, "Set up project");
  createCard(todo.id, "Create GraphQL schema");

  createCard(inProgress.id, "Implement kanban UI");

  createCard(done.id, "Drink coffee");
}

export function deleteCard(cardId: string) {
  for (const column of board.columns) {
    const index = column.cards.findIndex((card) => card.id === cardId);
    if (index !== -1) {
      column.cards.splice(index, 1);
      return cardId;
    }
  }
  throw new Error("Card not found");
}

export function updateBoardTitle(title: string) {
  board.title = title;
  return board;
}

export function resetBoard() {
  board.title = "My Kanban Board";
  board.columns = [];
  seedBoard();
  return board;
}

export function moveCard(
  cardId: string,
  targetColumnId: string,
  dropIndex: number,
) {
  let cardToMove: Card | undefined;
  let sourceColumn: Column | undefined;
  let sourceIndex = -1;

  for (const column of board.columns) {
    const index = column.cards.findIndex((card) => card.id === cardId);

    if (index !== -1) {
      cardToMove = column.cards[index];
      sourceColumn = column;
      sourceIndex = index;
      column.cards.splice(index, 1);
      break;
    }
  }

  if (!cardToMove) {
    throw new Error("Card not found");
  }

  const targetColumn = board.columns.find((col) => col.id === targetColumnId);

  if (!targetColumn) {
    throw new Error("Target column not found");
  }

  if (sourceColumn === targetColumn && sourceIndex < dropIndex) {
    dropIndex--;
  }

  const clampedIndex = Math.max(
    0,
    Math.min(dropIndex, targetColumn.cards.length),
  );
  targetColumn.cards.splice(clampedIndex, 0, cardToMove);

  cardToMove.order = clampedIndex;
  recalculateOrders(sourceColumn!);
  if (sourceColumn !== targetColumn) {
    recalculateOrders(targetColumn);
  }

  return cardToMove;
}

function recalculateOrders(column: Column) {
  column.cards.forEach((card, index) => {
    card.order = index;
  });
}
