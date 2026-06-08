import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../../shared/stores/auth.store";

export function Navbar() {
	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate({ to: "/login" });
	};

	return (
		<nav className="bg-white shadow">
			<div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
				<Link to="/" className="text-xl font-bold text-blue-600">
					Vigil
				</Link>

				<div className="hidden md:flex gap-6">
					<Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
						Dashboard
					</Link>
					<Link to="/videos" className="text-gray-700 hover:text-blue-600">
						Videos
					</Link>
					<Link
						to="/videos/upload"
						className="text-gray-700 hover:text-blue-600"
					>
						Upload
					</Link>
				</div>

				<div className="flex gap-4 items-center">
					<span className="text-sm text-gray-600 hidden sm:block">
						{user?.username}
					</span>
					<Link to="/profile" className="text-gray-700 hover:text-blue-600">
						Profile
					</Link>
					<button
						onClick={handleLogout}
						className="text-red-600 hover:text-red-700"
					>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
}
