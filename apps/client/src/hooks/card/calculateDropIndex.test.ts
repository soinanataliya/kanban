import { describe, expect, it } from 'vitest';
import { calculateDropIndex } from './calculateDropIndex';

describe('calculateDropIndex', () => {
  const cards = [
    { top: 0, height: 100 },
    { top: 108, height: 100 },
    { top: 216, height: 100 },
  ];

  it('returns 0 when mouse is above the midpoint of the first card', () => {
    expect(calculateDropIndex(cards, 0)).toBe(0);
    expect(calculateDropIndex(cards, 40)).toBe(0);
    expect(calculateDropIndex(cards, 49)).toBe(0);
  });

  it('returns 1 when mouse is below first card midpoint but above second card midpoint', () => {
    expect(calculateDropIndex(cards, 55)).toBe(1);
    expect(calculateDropIndex(cards, 100)).toBe(1);
    expect(calculateDropIndex(cards, 150)).toBe(1);
  });

  it('returns 2 when mouse is below second card midpoint but above third card midpoint', () => {
    expect(calculateDropIndex(cards, 218)).toBe(2);
    expect(calculateDropIndex(cards, 240)).toBe(2);
    expect(calculateDropIndex(cards, 265)).toBe(2);
  });

  it('returns last index when mouse is below the midpoint of the last card', () => {
    expect(calculateDropIndex(cards, 272)).toBe(3);
    expect(calculateDropIndex(cards, 400)).toBe(3);
    expect(calculateDropIndex(cards, 9999)).toBe(3);
  });

  it('returns 0 for a single card when mouse is above its midpoint', () => {
    expect(calculateDropIndex([{ top: 0, height: 50 }], 10)).toBe(0);
    expect(calculateDropIndex([{ top: 0, height: 50 }], 24)).toBe(0);
  });

  it('returns 1 for a single card when mouse is below its midpoint', () => {
    expect(calculateDropIndex([{ top: 0, height: 50 }], 26)).toBe(1);
    expect(calculateDropIndex([{ top: 0, height: 50 }], 100)).toBe(1);
  });

  it('returns 0 when there are no cards', () => {
    expect(calculateDropIndex([], 100)).toBe(0);
  });

  it('works with negative top offsets (scrolled container)', () => {
    const scrolledCards = [
      { top: -50, height: 100 },
      { top: 58, height: 100 },
    ];

    expect(calculateDropIndex(scrolledCards, -40)).toBe(0);
    expect(calculateDropIndex(scrolledCards, -1)).toBe(0);
    expect(calculateDropIndex(scrolledCards, 60)).toBe(1);
    expect(calculateDropIndex(scrolledCards, 150)).toBe(2);
  });

  it('uses strict less-than boundary at exact midpoint', () => {
    const rects = [{ top: 10, height: 80 }];

    expect(calculateDropIndex(rects, 49)).toBe(0);
    expect(calculateDropIndex(rects, 50)).toBe(1);
    expect(calculateDropIndex(rects, 51)).toBe(1);
  });
});
