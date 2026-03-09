import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CREATE_CARD_MUTATION } from '../graphql/createCard'
import { graphqlClient } from '@/lib/graphqlClient'

export function useCreateCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      columnId,
      title,
    }: {
      columnId: string
      title: string
    }) => {
      return graphqlClient.request(CREATE_CARD_MUTATION, {
        columnId,
        title,
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
  })
}
