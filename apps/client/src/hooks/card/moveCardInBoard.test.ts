import { describe, it, expect } from 'vitest';
import { moveCardInBoard } from './moveCardInBoard';
import type { BoardQuery } from '@/gql/graphql';

type Board = BoardQuery['board'];

function createBoard(overrides?: Partial<Board>): Board {
  return {
    id: 'board-1',
    title: 'Test Board',
    columns: [
      {
        id: 'col-1',
        title: 'Todo',
        order: 0,
        cards: [
          { id: 'card-1', title: 'Task A', order: 0 },
          { id: 'card-2', title: 'Task B', order: 1 },
          { id: 'card-3', title: 'Task C', order: 2 },
        ],
      },
      {
        id: 'col-2',
        title: 'Done',
        order: 1,
        cards: [
          { id: 'card-4', title: 'Task D', order: 0 },
          { id: 'card-5', title: 'Task E', order: 1 },
        ],
      },
      {
        id: 'col-3',
        title: 'Empty',
        order: 2,
        cards: [],
      },
    ],
    ...overrides,
  };
}

describe('moveCardInBoard', () => {
  it('moves a card between columns to the end', () => {
    const board = createBoard();

    const result = moveCardInBoard(board, 'card-1', 'col-1', 'col-2', 2);

    const source = result.columns.find((c) => c.id === 'col-1')!;
    const target = result.columns.find((c) => c.id === 'col-2')!;

    expect(source.cards).toHaveLength(2);
    expect(source.cards.map((c) => c.id)).toEqual(['card-2', 'card-3']);
    expect(target.cards).toHaveLength(3);
    expect(target.cards.map((c) => c.id)).toEqual(['card-4', 'card-5', 'card-1']);
  });

  it('moves a card between columns to a specific position', () => {
    const board = createBoard();

    const result = moveCardInBoard(board, 'card-3', 'col-1', 'col-2', 1);

    const target = result.columns.find((c) => c.id === 'col-2')!;

    expect(target.cards.map((c) => c.id)).toEqual(['card-4', 'card-3', 'card-5']);
  });

  it('moves a card to position 0 in another column', () => {
    const board = createBoard();

    const result = moveCardInBoard(board, 'card-1', 'col-1', 'col-2', 0);

    const target = result.columns.find((c) => c.id === 'col-2')!;

    expect(target.cards.map((c) => c.id)).toEqual(['card-1', 'card-4', 'card-5']);
  });

  it('reorders a card within the same column (drag down)', () => {
    const board = createBoard();

    const result = moveCardInBoard(board, 'card-1', 'col-1', 'col-1', 2);

    const column = result.columns.find((c) => c.id === 'col-1')!;

    expect(column.cards.map((c) => c.id)).toEqual(['card-2', 'card-1', 'card-3']);
  });

  it('reorders a card within the same column (drag up)', () => {
    const board = createBoard();

    const result = moveCardInBoard(board, 'card-3', 'col-1', 'col-1', 0);

    const column = result.columns.find((c) => c.id === 'col-1')!;

    expect(column.cards.map((c) => c.id)).toEqual(['card-3', 'card-1', 'card-2']);
  });

  it('moves card to end when dropping after last card in same column', () => {
    const board = createBoard();

    const result = moveCardInBoard(board, 'card-2', 'col-1', 'col-1', 3);

    const column = result.columns.find((c) => c.id === 'col-1')!;

    expect(column.cards.map((c) => c.id)).toEqual(['card-1', 'card-3', 'card-2']);
  });

  it('adjusts dropIndex when source index is before drop index in same column', () => {
    const board = createBoard();
    board.columns.find((c) => c.id === 'col-1')!.cards.push({ id: 'card-6', title: 'Task F', order: 3 });

    const result = moveCardInBoard(board, 'card-2', 'col-1', 'col-1', 3);

    const column = result.columns.find((c) => c.id === 'col-1')!;

    expect(column.cards.map((c) => c.id)).toEqual(['card-1', 'card-3', 'card-2', 'card-6']);
  });

  it('recalculates card order in both columns after move', () => {
    const board = createBoard();
    const result = moveCardInBoard(board, 'card-3', 'col-1', 'col-2', 0);

    const source = result.columns.find((c) => c.id === 'col-1')!;
    const target = result.columns.find((c) => c.id === 'col-2')!;

    source.cards.forEach((card, i) => {
      expect(card.order).toBe(i);
    });
    target.cards.forEach((card, i) => {
      expect(card.order).toBe(i);
    });
  });

  it('recalculates card order after same-column reorder', () => {
    const board = createBoard();
    const result = moveCardInBoard(board, 'card-1', 'col-1', 'col-1', 2);

    const column = result.columns.find((c) => c.id === 'col-1')!;

    column.cards.forEach((card, i) => {
      expect(card.order).toBe(i);
    });
  });

  it('returns original board when cardId is not found', () => {
    const board = createBoard();

    const result = moveCardInBoard(board, 'card-999', 'col-1', 'col-2', 0);

    expect(result).toBe(board);
  });

  it('returns original board when source column is not found', () => {
    const board = createBoard();

    const result = moveCardInBoard(board, 'card-1', 'col-999', 'col-2', 0);

    expect(result).toBe(board);
  });

  it('returns original board when target column is not found', () => {
    const board = createBoard();

    const result = moveCardInBoard(board, 'card-1', 'col-1', 'col-999', 0);

    expect(result).toBe(board);
  });

  it('does not mutate the original board', () => {
    const board = createBoard();

    moveCardInBoard(board, 'card-1', 'col-1', 'col-2', 0);

    const source = board.columns.find((c) => c.id === 'col-1')!;
    expect(source.cards.map((c) => c.id)).toEqual(['card-1', 'card-2', 'card-3']);
  });

  it('moves a card into an empty column', () => {
    const board = createBoard();

    const result = moveCardInBoard(board, 'card-1', 'col-1', 'col-3', 0);

    const source = result.columns.find((c) => c.id === 'col-1')!;
    const target = result.columns.find((c) => c.id === 'col-3')!;

    expect(source.cards).toHaveLength(2);
    expect(target.cards).toHaveLength(1);
    expect(target.cards[0].id).toBe('card-1');
  });

  it('clamps dropIndex to array bounds when too large', () => {
    const board = createBoard();

    const result = moveCardInBoard(board, 'card-1', 'col-1', 'col-2', 999);

    const target = result.columns.find((c) => c.id === 'col-2')!;

    expect(target.cards.map((c) => c.id)).toEqual(['card-4', 'card-5', 'card-1']);
  });

  it('clamps dropIndex to array bounds when negative', () => {
    const board = createBoard();

    const result = moveCardInBoard(board, 'card-1', 'col-1', 'col-2', -5);

    const target = result.columns.find((c) => c.id === 'col-2')!;

    expect(target.cards.map((c) => c.id)).toEqual(['card-1', 'card-4', 'card-5']);
  });
});
