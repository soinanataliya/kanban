import { gql } from 'graphql-request'

export const RESET_BOARD_MUTATION = gql`
  mutation ResetBoard {
    resetBoard {
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
`
