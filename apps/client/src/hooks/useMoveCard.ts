import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Board } from '@/types/kanban';
import type { MoveCardResponse, MoveCardVariables } from '@/types/mutations';
import { graphqlClient } from '@/lib/graphqlClient';
import { MOVE_CARD_MUTATION } from '@/graphql/moveCard';

type MoveCardContext = {
  previousBoard?: Board;
};

export function useMoveCard() {
  const queryClient = useQueryClient();

  return useMutation<
    MoveCardResponse,
    Error,
    MoveCardVariables,
    MoveCardContext
  >({
    mutationFn: (variables) =>
      graphqlClient.request<MoveCardResponse>(
        MOVE_CARD_MUTATION,
        variables,
      ),

    onMutate: async ({ cardId, fromColumnId, targetColumnId }) => {
      await queryClient.cancelQueries({ queryKey: ['board'] });

      const previousBoard = queryClient.getQueryData<Board>(['board']);

      queryClient.setQueryData<Board>(['board'], (old) => {
        if (!old) return old;

        const board = structuredClone(old);

        const source = board.columns.find((card) => card.id === fromColumnId);
        const target = board.columns.find((card) => card.id === targetColumnId);

        if (!source || !target) return old;

        const index = source.cards.findIndex((card) => card.id === cardId);

        if (index === -1) return old;

        const card = source.cards.splice(index, 1)[0];

        card.columnId = targetColumnId;
        target.cards.push(card);

        return board;
      });

      return { previousBoard };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousBoard) {
        queryClient.setQueryData(['board'], context.previousBoard);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });
}