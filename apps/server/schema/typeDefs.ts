export const typeDefs = `
  type Board {
    id: ID!
    title: String!
    columns: [Column!]!
  }

  type Column {
    id: ID!
    title: String!
    order: Int!
    cards: [Card!]!
  }

  type Card {
    id: ID!
    title: String!
    description: String
    order: Int!
  }

  type Query {
    board: Board!
  }

  type Mutation {
    createColumn(title: String!): Column!
    createCard(columnId: ID!, title: String!): Card!
  }

  type Mutation {
    createColumn(title: String!): Column!
    createCard(columnId: ID!, title: String!): Card!
    moveCard(cardId: ID!, targetColumnId: ID!): Card!
}
`;
