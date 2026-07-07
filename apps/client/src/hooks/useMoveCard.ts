import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { BoardQuery, MoveCardMutation, MoveCardMutationVariables } from '@/gql/graphql'
import { graphqlClient } from '@/lib/graphqlClient'
import { MoveCardDocument } from '@/gql/graphql'

type Board = BoardQuery['board']

type MoveCardParams = MoveCardMutationVariables & {
  fromColumnId: string
}

type MoveCardContext = {
  previousBoard?: Board
}

export function useMoveCard() {
  const queryClient = useQueryClient()

  return useMutation<MoveCardMutation, Error, MoveCardParams, MoveCardContext>({
    mutationFn: ({ cardId, targetColumnId }) =>
      graphqlClient.request(MoveCardDocument, { cardId, targetColumnId }),

    onMutate: async ({
      cardId,
      fromColumnId,
      targetColumnId,
    }: MoveCardParams) => {
      await queryClient.cancelQueries({ queryKey: ['board'] })

      const previousBoard = queryClient.getQueryData<Board>(['board'])

      queryClient.setQueryData<Board>(['board'], (old) => {
        if (!old) return old

        const cloned = structuredClone(old)

        const source = cloned.columns.find((col) => col.id === fromColumnId)
        const target = cloned.columns.find((col) => col.id === targetColumnId)

        if (!source || !target) return old

        const index = source.cards.findIndex((card) => card.id === cardId)
        if (index === -1) return old

        const [card] = source.cards.splice(index, 1)
        target.cards.push(card)

        return cloned
      })

      return { previousBoard }
    },

    onError: (_err, _vars, context) => {
      if (context?.previousBoard) {
        queryClient.setQueryData(['board'], context.previousBoard)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] })
    },
  })
}
