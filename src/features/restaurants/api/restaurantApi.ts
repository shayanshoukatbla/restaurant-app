import { apiClient } from '@api/client';
import type {
  RestaurantListResponse,
  RestaurantListParams,
  Restaurant,
  AddCommentRequest,
  UpdateCommentRequest,
  Review,
} from '@app-types/api';

export const restaurantApi = {
  getList: async (params: RestaurantListParams): Promise<RestaurantListResponse> => {
    const res = await apiClient.get<RestaurantListResponse>('/restaurant/list', { params });
    return res.data;
  },

  getDetail: async (id: string): Promise<Restaurant> => {
    const res = await apiClient.get<Restaurant>(`/restaurant/detail/${id}`);
    return res.data;
  },

  addComment: async ({
    id,
    body,
  }: {
    id: string;
    body: AddCommentRequest;
  }): Promise<Restaurant> => {
    const res = await apiClient.post<Restaurant>(`/restaurant/${id}/comment`, body);
    return res.data;
  },

  updateComment: async ({
    id,
    commentId,
    body,
  }: {
    id: string;
    commentId: string;
    body: UpdateCommentRequest;
  }): Promise<Review> => {
    const res = await apiClient.put<Review>(`/restaurant/${id}/comment/${commentId}`, body);
    return res.data;
  },

  deleteComment: async ({ id, commentId }: { id: string; commentId: string }): Promise<void> => {
    await apiClient.delete(`/restaurant/${id}/comment/${commentId}`);
  },
};
