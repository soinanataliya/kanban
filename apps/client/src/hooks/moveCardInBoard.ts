import type { BoardQuery } from '@/gql/graphql';

type Board = BoardQuery['board'];

function recalculateColumnOrders(column: { cards: { order: number }[] }) {
  column.cards.forEach((card, index) => {
    card.order = index;
  });
}

export function moveCardInBoard(
  board: Board,
  cardId: string | number,
  fromColumnId: string | number,
  targetColumnId: string | number,
  dropIndex: number,
): Board {
  const cloned = structuredClone(board);

  const source = cloned.columns.find((col) => col.id === fromColumnId);
  const target = cloned.columns.find((col) => col.id === targetColumnId);

  if (!source || !target) return board;

  const sourceIdx = source.cards.findIndex((card) => card.id === cardId);
  if (sourceIdx === -1) return board;

  const [card] = source.cards.splice(sourceIdx, 1);

  let adjustedDropIndex = dropIndex;
  if (fromColumnId === targetColumnId && sourceIdx < adjustedDropIndex) {
    adjustedDropIndex--;
  }

  adjustedDropIndex = Math.max(
    0,
    Math.min(adjustedDropIndex, target.cards.length),
  );
  target.cards.splice(adjustedDropIndex, 0, card);

  recalculateColumnOrders(source);
  if (source !== target) recalculateColumnOrders(target);

  return cloned;
}
