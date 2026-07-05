import { useQuery } from '@tanstack/react-query'
import type { BoardQuery } from '@/gql/graphql'
import { graphqlClient } from '@/lib/graphqlClient'
import { BoardDocument } from '@/gql/graphql'

type Board = BoardQuery['board']

export function useBoard() {
  return useQuery<Board>({
    queryKey: ['board'],
    queryFn: async () => {
      const data = await graphqlClient.request(BoardDocument)
      return data.board
    },
  })
}
