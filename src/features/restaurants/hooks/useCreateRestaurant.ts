import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantApi, uploadApi } from '../api/restaurantApi';
import type { ApiError, CreateRestaurantRequest } from '@app-types/api';
import type { Restaurant } from '@app-types/api';

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

const RESTAURANT_LIST_KEY = ['restaurant', 'list'] as const;

export function useCreateRestaurant() {
  const queryClient = useQueryClient();
  return useMutation<Restaurant, ApiError, CreateRestaurantRequest>({
    mutationFn: (body) => restaurantApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESTAURANT_LIST_KEY });
    },
  });
}
