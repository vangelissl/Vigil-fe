import { apiClient } from '../../../shared/api/client';
import { type Video, type VideoUploadResponse } from '../types';

export const videosAPI = {
  list: async () => {
    const response = await apiClient.get<Video[]>('/videos');
    return response.data;
  },

  getById: async (videoId: string) => {
    const response = await apiClient.get<Video>(`/videos/${videoId}`);
    return response.data;
  },

  getDownloadUrl: async (videoId: string) => {
    const response = await apiClient.get<{ url: string }>(
      `/videos/${videoId}/download`
    );
    return response.data.url;
  },

  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<VideoUploadResponse>(
      '/videos/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  delete: async (videoId: string) => {
    await apiClient.delete(`/videos/${videoId}`);
  },
};