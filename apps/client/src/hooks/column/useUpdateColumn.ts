import { useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphqlClient';
import { UpdateColumnDocument } from '@/gql/graphql';

export function useUpdateColumn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      title,
    }: {
      id: string;
      title: string;
    }) => {
      return graphqlClient.request(UpdateColumnDocument, { id, title });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });
}
