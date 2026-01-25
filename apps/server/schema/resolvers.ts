import { board, createColumn, createCard } from '../store.js'

export const resolvers = {
  Query: {
    board: () => board,
  },
  Mutation: {
    createColumn: (_: any, { title }: { title: string }) => {
      return createColumn(title)
    },
    createCard: (
      _: any,
      { columnId, title }: { columnId: string; title: string }
    ) => {
      return createCard(columnId, title)
    },
  },
}
