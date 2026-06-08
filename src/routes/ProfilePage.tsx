import { ProfileForm } from '../features/users/components/ProfileForm';

export function ProfilePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        <ProfileForm />
      </div>
    </div>
  );
}