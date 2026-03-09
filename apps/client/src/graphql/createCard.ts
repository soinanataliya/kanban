export const CREATE_CARD_MUTATION = `
  mutation CreateCard($columnId: ID!, $title: String!) {
    createCard(columnId: $columnId, title: $title) {
      id
      title
      order
    }
  }
`