import { describe, expect, it } from 'vitest';
import { moveColumnInBoard } from './moveColumnInBoard';
import type { BoardQuery } from '@/gql/graphql';

type Board = BoardQuery['board'];

function createBoard(overrides?: Partial<Board>): Board {
  return {
    id: 'board-1',
    title: 'Test Board',
    columns: [
      { id: 'col-1', title: 'Todo', order: 0, cards: [] },
      { id: 'col-2', title: 'In Progress', order: 1, cards: [] },
      { id: 'col-3', title: 'Done', order: 2, cards: [] },
      { id: 'col-4', title: 'Review', order: 3, cards: [] },
    ],
    ...overrides,
  };
}

describe('moveColumnInBoard', () => {
  it('moves a column forward to a later index', () => {
    const board = createBoard();
    const result = moveColumnInBoard(board, 'col-1', 2);

    expect(result.columns.map((c) => c.id)).toEqual([
      'col-2', 'col-1', 'col-3', 'col-4',
    ]);
  });

  it('moves a column backward to an earlier index', () => {
    const board = createBoard();
    const result = moveColumnInBoard(board, 'col-3', 0);

    expect(result.columns.map((c) => c.id)).toEqual([
      'col-3', 'col-1', 'col-2', 'col-4',
    ]);
  });

  it('moves a column to position 0', () => {
    const board = createBoard();
    const result = moveColumnInBoard(board, 'col-3', 0);

    const first = result.columns[0];
    expect(first.id).toBe('col-3');
    expect(result.columns.map((c) => c.id)).toEqual([
      'col-3', 'col-1', 'col-2', 'col-4',
    ]);
  });

  it('moves a column to the last position', () => {
    const board = createBoard();
    const result = moveColumnInBoard(board, 'col-1', 4);

    const last = result.columns[result.columns.length - 1];
    expect(last.id).toBe('col-1');
    expect(result.columns.map((c) => c.id)).toEqual([
      'col-2', 'col-3', 'col-4', 'col-1',
    ]);
  });

  it('keeps column in place when dropped at its own index (moving forward)', () => {
    const board = createBoard();
    const result = moveColumnInBoard(board, 'col-2', 2);

    expect(result.columns.map((c) => c.id)).toEqual([
      'col-1', 'col-2', 'col-3', 'col-4',
    ]);
  });

  it('keeps column in place when dropped at its own index (moving backward)', () => {
    const board = createBoard();
    const result = moveColumnInBoard(board, 'col-2', 1);

    expect(result.columns.map((c) => c.id)).toEqual([
      'col-1', 'col-2', 'col-3', 'col-4',
    ]);
  });

  it('recalculates column orders after move', () => {
    const board = createBoard();
    const result = moveColumnInBoard(board, 'col-1', 2);

    result.columns.forEach((col, i) => {
      expect(col.order).toBe(i);
    });
  });

  it('returns original board when columnId is not found', () => {
    const board = createBoard();
    const result = moveColumnInBoard(board, 'col-999', 1);

    expect(result).toBe(board);
  });

  it('does not mutate the original board', () => {
    const board = createBoard();
    moveColumnInBoard(board, 'col-1', 2);

    expect(board.columns.map((c) => c.id)).toEqual([
      'col-1', 'col-2', 'col-3', 'col-4',
    ]);
  });

  it('clamps targetIndex to array bounds when too large', () => {
    const board = createBoard();
    const result = moveColumnInBoard(board, 'col-1', 999);

    expect(result.columns.map((c) => c.id)).toEqual([
      'col-2', 'col-3', 'col-4', 'col-1',
    ]);
  });

  it('clamps targetIndex to array bounds when negative', () => {
    const board = createBoard();
    const result = moveColumnInBoard(board, 'col-3', -5);

    expect(result.columns.map((c) => c.id)).toEqual([
      'col-3', 'col-1', 'col-2', 'col-4',
    ]);
  });

  it('adjusts targetIndex when source is before destination in same list', () => {
    const board = createBoard();
    const result = moveColumnInBoard(board, 'col-2', 4);

    expect(result.columns.map((c) => c.id)).toEqual([
      'col-1', 'col-3', 'col-4', 'col-2',
    ]);
  });
});
