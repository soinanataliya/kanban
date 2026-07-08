import { useMutation, useQueryClient } from '@tanstack/react-query';
import { moveCardInBoard } from './moveCardInBoard';
import type {
  BoardQuery,
  MoveCardMutation,
  MoveCardMutationVariables,
} from '@/gql/graphql';
import { graphqlClient } from '@/lib/graphqlClient';
import { MoveCardDocument } from '@/gql/graphql';

type Board = BoardQuery['board'];

type MoveCardParams = MoveCardMutationVariables & {
  fromColumnId: string;
  dropIndex: number;
};

type MoveCardContext = {
  previousBoard?: Board;
};

export function useMoveCard() {
  const queryClient = useQueryClient();

  return useMutation<MoveCardMutation, Error, MoveCardParams, MoveCardContext>({
    mutationFn: ({ cardId, targetColumnId, dropIndex }) =>
      graphqlClient.request(MoveCardDocument, {
        cardId,
        targetColumnId,
        dropIndex,
      }),

    onMutate: async (params: MoveCardParams) => {
      await queryClient.cancelQueries({ queryKey: ['board'] });

      const previousBoard = queryClient.getQueryData<Board>(['board']);

      queryClient.setQueryData<Board>(['board'], (old) => {
        if (!old) return old;
        return moveCardInBoard(
          old,
          params.cardId,
          params.fromColumnId,
          params.targetColumnId,
          params.dropIndex,
        );
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
