import { apiClient } from '@api/client';
import type { SignupRequest, LoginRequest, LoginResponse } from '@app-types/api';

export const authApi = {
  signup: async (body: SignupRequest): Promise<LoginResponse> => {
    const res = await apiClient.post<LoginResponse>('/auth/signup', body);
    return res.data;
  },

  login: async (body: LoginRequest): Promise<LoginResponse> => {
    const res = await apiClient.post<LoginResponse>('/auth/login', body);
    return res.data;
  },
};
