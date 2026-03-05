import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { restaurantApi, uploadApi } from '../api/restaurantApi';
import type {
  ApiError,
  CreateRestaurantRequest,
  UpdateRestaurantRequest,
  RestaurantListResponse,
} from '@app-types/api';
import type { Restaurant } from '@app-types/api';
import { RESTAURANT_DETAIL_KEY } from './useRestaurantDetail';
import { RESTAURANT_LIST_KEY } from './useRestaurantList';

interface UploadImageParams {
  fileUri: string;
  contentType: string;
  sizeBytes: number;
}

export function useUploadImage() {
  return useMutation<string, ApiError, UploadImageParams>({
    mutationFn: async ({ fileUri, contentType, sizeBytes }) => {
      const { uploadUrl, publicUrl } = await uploadApi.presign({ contentType, sizeBytes });
      await uploadApi.uploadFile(uploadUrl, fileUri, contentType);
      return publicUrl;
    },
  });
}

export function useCreateRestaurant() {
  const queryClient = useQueryClient();
  return useMutation<Restaurant, ApiError, CreateRestaurantRequest>({
    mutationFn: (body) => restaurantApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESTAURANT_LIST_KEY });
    },
  });
}

export function useUpdateRestaurant(restaurantId: string) {
  const queryClient = useQueryClient();
  return useMutation<Restaurant, ApiError, UpdateRestaurantRequest>({
    mutationFn: (body) => restaurantApi.update(restaurantId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESTAURANT_DETAIL_KEY(restaurantId) });
      queryClient.invalidateQueries({ queryKey: RESTAURANT_LIST_KEY });
    },
  });
}

export function useDeleteRestaurant() {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: (id) => restaurantApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<InfiniteData<RestaurantListResponse>>(RESTAURANT_LIST_KEY, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            restaurantList: page.restaurantList.filter((r) => r._id !== id),
            total: page.total - 1,
          })),
        };
      });

      queryClient.removeQueries({ queryKey: RESTAURANT_DETAIL_KEY(id) });
    },
  });
}
