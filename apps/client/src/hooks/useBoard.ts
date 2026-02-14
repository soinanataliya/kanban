import { useQuery } from '@tanstack/react-query'
import { graphqlClient } from '../lib/graphqlClient'
import { BOARD_QUERY } from '../graphql/board'

type Board = {
  columns: Column[];
}

type Column = {
  cards: Card[];
  id: string;
  title: string;
  order: number;
}

type Card = {
  id: string
  title: string
  description?: string
  order: number
}
export function useBoard() {
  return useQuery({
    queryKey: ['board'],
    queryFn: async () => {
      const data = await graphqlClient.request<{
        board: Board
      }>(BOARD_QUERY)

      return data.board
    },
  })
}
