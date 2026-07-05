import { gql } from 'graphql-request'

export const CREATE_CARD_MUTATION = gql`
  mutation CreateCard($columnId: ID!, $title: String!) {
    createCard(columnId: $columnId, title: $title) {
      id
      title
      order
    }
  }
`