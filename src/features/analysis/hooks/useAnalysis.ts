import { useQuery, useMutation } from '@tanstack/react-query';
import { analysisAPI } from '../api/analysis.api';
import { useUIStore } from '../../../shared/stores/ui.store';

export function useAnalysis(analysisId: string) {
  return useQuery({
    queryKey: ['analysis', analysisId],
    queryFn: () => analysisAPI.getAnalysis(analysisId),
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === 'COMPLETED' || status === 'FAILED') {
        return false;
      }
      return 2000;
    },
  });
}

export function useTriggerAnalysis() {
  const addToast = useUIStore((state) => state.addToast);

  return useMutation({
    mutationFn: (videoId: string) => analysisAPI.triggerAnalysis(videoId),
    onSuccess: () => {
      addToast('Analysis started', 'info');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      addToast(error.response?.data?.detail || 'Failed to start analysis', 'error');
    },
  });
}