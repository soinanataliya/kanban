import { gql } from 'graphql-request'

export const DELETE_CARD_MUTATION = gql`
  mutation DeleteCard($cardId: ID!) {
    deleteCard(cardId: $cardId)
  }
`
