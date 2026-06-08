import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { videosAPI } from '../api/videos.api';
import { useUIStore } from '../../../shared/stores/ui.store';

export function useVideoList() {
  const queryClient = useQueryClient();
  const addToast = useUIStore((state) => state.addToast);

  const query = useQuery({
    queryKey: ['videos'],
    queryFn: () => videosAPI.list(),
    staleTime: 1000 * 60 * 5,
  });

  const deleteMutation = useMutation({
    mutationFn: (videoId: string) => videosAPI.delete(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      addToast('Video deleted', 'success');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      addToast(error.response?.data?.detail || 'Delete failed', 'error');
    },
  });

  return {
    videos: query.data,
    isLoading: query.isLoading,
    error: query.error,
    deleteVideo: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}