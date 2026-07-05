import { gql } from 'graphql-request'

export const MOVE_CARD_MUTATION = gql`
mutation MoveCard($cardId: ID!, $targetColumnId: ID!) {
  moveCard(cardId: $cardId, targetColumnId: $targetColumnId) {
    id
  }
}
`;