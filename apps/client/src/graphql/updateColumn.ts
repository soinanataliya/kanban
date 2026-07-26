import { gql } from 'graphql-request';

export const UPDATE_COLUMN_MUTATION = gql`
  mutation UpdateColumn($id: ID!, $title: String!) {
    updateColumn(id: $id, title: $title) {
      id
      title
      order
    }
  }
`;
