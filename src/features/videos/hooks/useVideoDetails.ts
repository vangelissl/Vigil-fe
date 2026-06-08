import { useQuery } from '@tanstack/react-query';
import { videosAPI } from '../api/videos.api';

export function useVideoDetail(videoId: string) {
  return useQuery({
    queryKey: ['video', videoId],
    queryFn: () => videosAPI.getById(videoId),
  });
}