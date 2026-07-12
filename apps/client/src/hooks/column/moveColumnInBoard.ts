import type { BoardQuery } from '@/gql/graphql';

type Board = BoardQuery['board'];

export function moveColumnInBoard(
  board: Board,
  columnId: string,
  targetIndex: number,
): Board {
  const cloned = structuredClone(board);

  const sourceIndex = cloned.columns.findIndex((col) => col.id === columnId);
  if (sourceIndex === -1) return board;

  const [column] = cloned.columns.splice(sourceIndex, 1);

  let adjustedIndex = targetIndex;
  if (sourceIndex < adjustedIndex) {
    adjustedIndex--;
  }

  adjustedIndex = Math.max(0, Math.min(adjustedIndex, cloned.columns.length));
  cloned.columns.splice(adjustedIndex, 0, column);

  cloned.columns.forEach((col, index) => {
    col.order = index;
  });

  return cloned;
}
