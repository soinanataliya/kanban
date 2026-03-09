export const MOVE_CARD_MUTATION = `
mutation MoveCard($cardId: ID!, $targetColumnId: ID!) {
  moveCard(cardId: $cardId, targetColumnId: $targetColumnId) {
    id
  }
}
`;