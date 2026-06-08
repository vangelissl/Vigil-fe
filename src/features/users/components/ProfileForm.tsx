import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileFormData } from '../utils/validation';
import { useProfile } from '../hooks/useProfile';
import { useEffect } from 'react';

export function ProfileForm() {
  const { user, updateProfile, isUpdating } = useProfile();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        username: user.username,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: ProfileFormData) => {
    updateProfile(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register('email')}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium">Username</label>
        <input
          type="text"
          {...register('username')}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isUpdating}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isUpdating ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}