import { apiClient } from '@api/client';
import type {
  RestaurantListResponse,
  RestaurantListParams,
  Restaurant,
  AddCommentRequest,
  UpdateCommentRequest,
  Review,
  PresignRequest,
  PresignResponse,
  CreateRestaurantRequest,
} from '@app-types/api';

export const uploadApi = {
  presign: async (body: PresignRequest): Promise<PresignResponse> => {
    const res = await apiClient.post<PresignResponse>('/upload/presign', body);
    return res.data;
  },

  uploadFile: (uploadUrl: string, fileUri: string, contentType: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', uploadUrl);
      xhr.setRequestHeader('Content-Type', contentType);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      };
      xhr.onerror = () => reject(new Error('Upload network error'));
      xhr.ontimeout = () => reject(new Error('Upload timed out'));
      xhr.timeout = 60000;
      xhr.send({ uri: fileUri, type: contentType, name: 'upload' } as unknown as Document);
    });
  },
};

export const restaurantApi = {
  create: async (body: CreateRestaurantRequest): Promise<Restaurant> => {
    const res = await apiClient.post<Restaurant>('/restaurant/create', body);
    return res.data;
  },

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
