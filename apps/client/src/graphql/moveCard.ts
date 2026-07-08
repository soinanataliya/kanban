import { gql } from 'graphql-request';

export const MOVE_CARD_MUTATION = gql`
  mutation MoveCard($cardId: ID!, $targetColumnId: ID!, $dropIndex: Int!) {
    moveCard(
      cardId: $cardId
      targetColumnId: $targetColumnId
      dropIndex: $dropIndex
    ) {
      id
    }
  }
`;
