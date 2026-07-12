type Rect = { left: number; width: number };

export function calculateColumnDropIndex(
  columnRects: Rect[],
  mouseX: number,
): number {
  for (let i = 0; i < columnRects.length; i++) {
    const mid = columnRects[i].left + columnRects[i].width / 2;
    if (mouseX < mid) {
      return i;
    }
  }
  return columnRects.length;
}
