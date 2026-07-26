import { useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphqlClient';
import { CreateColumnDocument } from '@/gql/graphql';

export function useCreateColumn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      return graphqlClient.request(CreateColumnDocument, { title });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });
}
