import { useMutation, useQueryClient } from '@tanstack/react-query';
import { moveColumnInBoard } from './moveColumnInBoard';
import type {
  BoardQuery,
  MoveColumnMutation,
  MoveColumnMutationVariables,
} from '@/gql/graphql';
import { graphqlClient } from '@/lib/graphqlClient';
import { MoveColumnDocument } from '@/gql/graphql';

type Board = BoardQuery['board'];

type MoveColumnContext = {
  previousBoard?: Board;
};

export function useMoveColumn() {
  const queryClient = useQueryClient();

  return useMutation<MoveColumnMutation, Error, MoveColumnMutationVariables, MoveColumnContext>({
    mutationFn: ({ columnId, targetIndex }) =>
      graphqlClient.request(MoveColumnDocument, { columnId, targetIndex }),

    onMutate: async (params) => {
      await queryClient.cancelQueries({ queryKey: ['board'] });

      const previousBoard = queryClient.getQueryData<Board>(['board']);

      queryClient.setQueryData<Board>(['board'], (old) => {
        if (!old) return old;
        return moveColumnInBoard(old, String(params.columnId), params.targetIndex);
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
