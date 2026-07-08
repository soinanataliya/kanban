export function calculateDropIndex(
  cardRects: { top: number; height: number }[],
  mouseY: number,
): number {
  for (let i = 0; i < cardRects.length; i++) {
    const { top, height } = cardRects[i];
    if (mouseY < top + height / 2) {
      return i;
    }
  }

  return cardRects.length;
}
