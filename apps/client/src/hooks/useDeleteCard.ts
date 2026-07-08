import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  DeleteCardMutation,
  DeleteCardMutationVariables,
} from '@/gql/graphql';
import { graphqlClient } from '@/lib/graphqlClient';
import { DeleteCardDocument } from '@/gql/graphql';

export function useDeleteCard() {
  const queryClient = useQueryClient();

  return useMutation<DeleteCardMutation, Error, DeleteCardMutationVariables>({
    mutationFn: ({ cardId }) =>
      graphqlClient.request(DeleteCardDocument, { cardId }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });
}
