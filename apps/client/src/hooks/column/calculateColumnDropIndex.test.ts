import { describe, expect, it } from 'vitest';
import { calculateColumnDropIndex } from './calculateColumnDropIndex';

describe('calculateColumnDropIndex', () => {
  const columns = [
    { left: 0, width: 200 },
    { left: 216, width: 200 },
    { left: 432, width: 200 },
  ];

  it('returns 0 when mouse is before the midpoint of the first column', () => {
    expect(calculateColumnDropIndex(columns, 0)).toBe(0);
    expect(calculateColumnDropIndex(columns, 50)).toBe(0);
    expect(calculateColumnDropIndex(columns, 99)).toBe(0);
  });

  it('returns 1 when mouse is between first and second column midpoints', () => {
    expect(calculateColumnDropIndex(columns, 101)).toBe(1);
    expect(calculateColumnDropIndex(columns, 200)).toBe(1);
    expect(calculateColumnDropIndex(columns, 315)).toBe(1);
  });

  it('returns 2 when mouse is between second and third column midpoints', () => {
    expect(calculateColumnDropIndex(columns, 317)).toBe(2);
    expect(calculateColumnDropIndex(columns, 432)).toBe(2);
    expect(calculateColumnDropIndex(columns, 531)).toBe(2);
  });

  it('returns last index when mouse is after the midpoint of the last column', () => {
    expect(calculateColumnDropIndex(columns, 533)).toBe(3);
    expect(calculateColumnDropIndex(columns, 800)).toBe(3);
    expect(calculateColumnDropIndex(columns, 9999)).toBe(3);
  });

  it('returns 0 for a single column when mouse is before its midpoint', () => {
    expect(calculateColumnDropIndex([{ left: 0, width: 100 }], 10)).toBe(0);
    expect(calculateColumnDropIndex([{ left: 0, width: 100 }], 49)).toBe(0);
  });

  it('returns 1 for a single column when mouse is past its midpoint', () => {
    expect(calculateColumnDropIndex([{ left: 0, width: 100 }], 51)).toBe(1);
    expect(calculateColumnDropIndex([{ left: 0, width: 100 }], 200)).toBe(1);
  });

  it('returns 0 when there are no columns', () => {
    expect(calculateColumnDropIndex([], 100)).toBe(0);
  });

  it('works with negative left offsets (scrolled container)', () => {
    const scrolled = [
      { left: -200, width: 200 },
      { left: 16, width: 200 },
    ];

    expect(calculateColumnDropIndex(scrolled, -150)).toBe(0);
    expect(calculateColumnDropIndex(scrolled, -101)).toBe(0);
    expect(calculateColumnDropIndex(scrolled, 100)).toBe(1);
    expect(calculateColumnDropIndex(scrolled, 200)).toBe(2);
  });

  it('uses strict less-than boundary at exact midpoint', () => {
    const cols = [{ left: 10, width: 80 }];

    expect(calculateColumnDropIndex(cols, 49)).toBe(0);
    expect(calculateColumnDropIndex(cols, 50)).toBe(1);
    expect(calculateColumnDropIndex(cols, 51)).toBe(1);
  });

  it('handles columns of different widths', () => {
    const uneven = [
      { left: 0, width: 150 },
      { left: 166, width: 300 },
    ];

    expect(calculateColumnDropIndex(uneven, 50)).toBe(0);
    expect(calculateColumnDropIndex(uneven, 74)).toBe(0);
    expect(calculateColumnDropIndex(uneven, 80)).toBe(1);
    expect(calculateColumnDropIndex(uneven, 200)).toBe(1);
    expect(calculateColumnDropIndex(uneven, 400)).toBe(2);
  });
});
