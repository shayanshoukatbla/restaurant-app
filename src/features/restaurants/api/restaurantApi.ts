import { apiClient } from '@api/client';
import type { RestaurantListResponse, RestaurantListParams } from '@app-types/api';

export const restaurantApi = {
  getList: async (params: RestaurantListParams): Promise<RestaurantListResponse> => {
    const res = await apiClient.get<RestaurantListResponse>('/restaurant/list', { params });
    return res.data;
  },
};
