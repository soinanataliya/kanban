import { gql } from 'graphql-request';

export const DELETE_COLUMN_MUTATION = gql`
  mutation DeleteColumn($id: ID!) {
    deleteColumn(id: $id)
  }
`;
