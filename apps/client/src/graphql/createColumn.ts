import { gql } from 'graphql-request';

export const CREATE_COLUMN_MUTATION = gql`
  mutation CreateColumn($title: String!) {
    createColumn(title: $title) {
      id
      title
      order
    }
  }
`;
