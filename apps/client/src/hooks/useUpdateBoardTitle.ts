import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UpdateBoardTitleMutation } from '@/gql/graphql'
import { graphqlClient } from '@/lib/graphqlClient'
import { UpdateBoardTitleDocument } from '@/gql/graphql'

export function useUpdateBoardTitle() {
  const queryClient = useQueryClient()

  return useMutation<UpdateBoardTitleMutation, Error, { title: string }>({
    mutationFn: ({ title }) =>
      graphqlClient.request(UpdateBoardTitleDocument, { title }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
  })
}
