import { gql } from 'graphql-request';

export const BOARD_QUERY = gql`
  query Board {
    board {
      id
      title
      columns {
        id
        title
        order
        cards {
          id
          title
          order
        }
      }
    }
  }
`;
