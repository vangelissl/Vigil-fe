import { apiClient } from '../../../shared/api/client';
import { type LoginRequest, type RegisterRequest, type AuthResponse } from '../types';

export const authAPI = {
  login: async (data: LoginRequest) => {
    const response = await apiClient.post<AuthResponse>(
      '/auth/login',
      data
    );
    return response.data;
  },

  register: async (data: RegisterRequest) => {
    const response = await apiClient.post<AuthResponse>(
      '/auth/register',
      data
    );
    return response.data;
  },

  refresh: async () => {
    const response = await apiClient.post<{ access_token: string }>(
      '/auth/refresh',
      {}
    );
    return response.data;
  },
};