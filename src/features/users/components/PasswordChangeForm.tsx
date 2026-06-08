import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema, type PasswordFormData } from '../utils/validation';

export function PasswordChangeForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    // TODO: Implement password change API call
    console.log('Change password:', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium">Current Password</label>
        <input
          type="password"
          {...register('currentPassword')}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.currentPassword && <span className="text-red-500 text-sm">{errors.currentPassword.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium">New Password</label>
        <input
          type="password"
          {...register('newPassword')}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.newPassword && <span className="text-red-500 text-sm">{errors.newPassword.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium">Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword')}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded"
        />
        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Changing...' : 'Change Password'}
      </button>
    </form>
  );
}