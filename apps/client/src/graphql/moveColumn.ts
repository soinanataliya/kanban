import { gql } from 'graphql-request';

export const MOVE_COLUMN_MUTATION = gql`
  mutation MoveColumn($columnId: ID!, $targetIndex: Int!) {
    moveColumn(columnId: $columnId, targetIndex: $targetIndex) {
      id
    }
  }
`;
