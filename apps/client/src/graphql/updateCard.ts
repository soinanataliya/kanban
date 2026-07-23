import { gql } from 'graphql-request';

export const UPDATE_CARD_MUTATION = gql`
  mutation UpdateCard($id: ID!, $title: String!, $description: String) {
    updateCard(id: $id, title: $title, description: $description) {
      id
      title
      description
      order
    }
  }
`;
