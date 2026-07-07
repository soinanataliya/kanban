import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ResetBoardMutation } from '@/gql/graphql'
import { graphqlClient } from '@/lib/graphqlClient'
import { ResetBoardDocument } from '@/gql/graphql'

export function useResetBoard() {
  const queryClient = useQueryClient()

  return useMutation<ResetBoardMutation, Error>({
    mutationFn: () => graphqlClient.request(ResetBoardDocument),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
  })
}
