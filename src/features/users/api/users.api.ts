import { apiClient } from '../../../shared/api/client';
import { type User, type UpdateUserRequest } from '../types';

export const usersAPI = {
  getCurrentUser: async () => {
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  },

  updateProfile: async (data: UpdateUserRequest) => {
    const response = await apiClient.patch<User>('/users/me', data);
    return response.data;
  },
};