import { useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphqlClient';
import { UpdateCardDocument } from '@/gql/graphql';

export function useUpdateCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      title,
      description,
    }: {
      id: string;
      title: string;
      description?: string;
    }) => {
      return graphqlClient.request(UpdateCardDocument, {
        id,
        title,
        description,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });
}
