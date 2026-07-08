import { gql } from 'graphql-request';

export const UPDATE_BOARD_TITLE_MUTATION = gql`
  mutation UpdateBoardTitle($title: String!) {
    updateBoardTitle(title: $title) {
      id
      title
    }
  }
`;
