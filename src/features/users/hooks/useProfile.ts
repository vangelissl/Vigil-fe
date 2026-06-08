import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersAPI } from '../api/users.api';
import { useUIStore } from '../../../shared/stores/ui.store';
import { type ProfileFormData } from '../utils/validation';

export function useProfile() {
  const queryClient = useQueryClient();
  const addToast = useUIStore((state) => state.addToast);

  const userQuery = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => usersAPI.getCurrentUser(),
  });

  const updateMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      return usersAPI.updateProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      addToast('Profile updated!', 'success');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Update failed';
      addToast(message, 'error');
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}