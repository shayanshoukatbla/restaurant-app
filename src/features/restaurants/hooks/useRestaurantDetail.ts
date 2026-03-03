import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantApi } from '../api/restaurantApi';
import type { AddCommentRequest, UpdateCommentRequest, ApiError } from '@app-types/api';

export const RESTAURANT_DETAIL_KEY = (id: string) => ['restaurant', 'detail', id] as const;

export function useRestaurantDetail(id: string) {
  return useQuery({
    queryKey: RESTAURANT_DETAIL_KEY(id),
    queryFn: () => restaurantApi.getDetail(id),
    enabled: Boolean(id),
  });
}

export function useAddComment(restaurantId: string) {
  const queryClient = useQueryClient();
  return useMutation<unknown, ApiError, AddCommentRequest>({
    mutationFn: (body) => restaurantApi.addComment({ id: restaurantId, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESTAURANT_DETAIL_KEY(restaurantId) });
    },
  });
}

export function useUpdateComment(restaurantId: string) {
  const queryClient = useQueryClient();
  return useMutation<unknown, ApiError, { commentId: string; body: UpdateCommentRequest }>({
    mutationFn: ({ commentId, body }) =>
      restaurantApi.updateComment({ id: restaurantId, commentId, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESTAURANT_DETAIL_KEY(restaurantId) });
    },
  });
}

export function useDeleteComment(restaurantId: string) {
  const queryClient = useQueryClient();
  return useMutation<unknown, ApiError, string>({
    mutationFn: (commentId) => restaurantApi.deleteComment({ id: restaurantId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESTAURANT_DETAIL_KEY(restaurantId) });
    },
  });
}
