import { useMutation, useQueryClient } from '@tanstack/react-query';
import { videosAPI } from '../api/videos.api';
import { useUIStore } from '../../../shared/stores/ui.store';
import { useNavigate } from '@tanstack/react-router';

export function useVideoUpload() {
  const queryClient = useQueryClient();
  const addToast = useUIStore((state) => state.addToast);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (file: File) => videosAPI.upload(file),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      addToast(`Video "${data.filename}" uploaded!`, 'success');
      navigate({ to: '/videos' });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Upload failed';
      addToast(message, 'error');
    },
  });
}