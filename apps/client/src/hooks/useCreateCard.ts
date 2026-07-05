import { useMutation, useQueryClient } from '@tanstack/react-query'
import { graphqlClient } from '@/lib/graphqlClient'
import { CreateCardDocument } from '@/gql/graphql'

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
      return graphqlClient.request(CreateCardDocument, { columnId, title })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
  })
}
