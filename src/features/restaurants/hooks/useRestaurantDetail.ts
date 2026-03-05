import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { restaurantApi } from '../api/restaurantApi';
import type {
  AddCommentRequest,
  UpdateCommentRequest,
  ApiError,
  Restaurant,
  RestaurantListResponse,
} from '@app-types/api';
import { RESTAURANT_LIST_KEY } from './useRestaurantList';
import { useFavoritesStore } from '../store/useFavoritesStore';

export const RESTAURANT_DETAIL_KEY = (id: string) => ['restaurant', 'detail', id] as const;

export function useRestaurantDetail(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: RESTAURANT_DETAIL_KEY(id),
    queryFn: () => restaurantApi.getDetail(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
    placeholderData: () => {
      const listData =
        queryClient.getQueryData<InfiniteData<RestaurantListResponse>>(RESTAURANT_LIST_KEY);
      if (!listData) return undefined;
      for (const page of listData.pages) {
        const match = page.restaurantList.find((r) => r._id === id);
        if (match) return match;
      }
      return undefined;
    },
  });
}

async function syncFavoriteCache(
  queryClient: ReturnType<typeof useQueryClient>,
  restaurantId: string,
) {
  const updateCached = useFavoritesStore.getState().updateCachedRestaurant;

  await queryClient.invalidateQueries({ queryKey: RESTAURANT_DETAIL_KEY(restaurantId) });

  const fresh = queryClient.getQueryData<Restaurant>(RESTAURANT_DETAIL_KEY(restaurantId));
  if (fresh) {
    updateCached(fresh);
  }
}

export function useAddComment(restaurantId: string) {
  const queryClient = useQueryClient();
  return useMutation<unknown, ApiError, AddCommentRequest>({
    mutationFn: (body) => restaurantApi.addComment({ id: restaurantId, body }),
    onSuccess: async () => {
      await syncFavoriteCache(queryClient, restaurantId);
      queryClient.invalidateQueries({ queryKey: RESTAURANT_LIST_KEY });
    },
  });
}

export function useUpdateComment(restaurantId: string) {
  const queryClient = useQueryClient();
  return useMutation<unknown, ApiError, { commentId: string; body: UpdateCommentRequest }>({
    mutationFn: ({ commentId, body }) =>
      restaurantApi.updateComment({ id: restaurantId, commentId, body }),
    onSuccess: async () => {
      await syncFavoriteCache(queryClient, restaurantId);
      queryClient.invalidateQueries({ queryKey: RESTAURANT_LIST_KEY });
    },
  });
}

export function useDeleteComment(restaurantId: string) {
  const queryClient = useQueryClient();
  return useMutation<unknown, ApiError, string>({
    mutationFn: (commentId) => restaurantApi.deleteComment({ id: restaurantId, commentId }),
    onSuccess: async () => {
      await syncFavoriteCache(queryClient, restaurantId);
      queryClient.invalidateQueries({ queryKey: RESTAURANT_LIST_KEY });
    },
  });
}
