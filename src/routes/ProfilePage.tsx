import { ProfileForm } from "../features/users/components/ProfileForm";
import { PasswordChangeForm } from "../features/users/components/PasswordChangeForm";

export function ProfilePage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
			<div className="w-full max-w-2xl space-y-8">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold">Profile Settings</h1>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					<div className="bg-white rounded-lg shadow p-6">
						<h2 className="text-xl font-semibold mb-6">Profile Information</h2>
						<ProfileForm />
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<h2 className="text-xl font-semibold mb-6">Change Password</h2>
						<PasswordChangeForm />
					</div>
				</div>
			</div>
		</div>
	);
}
