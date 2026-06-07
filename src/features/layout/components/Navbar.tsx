import { Link } from '@tanstack/react-router';
import { useAuthStore } from '../../../shared/stores/auth.store';

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">
          Vigil
        </Link>

        <div className="flex gap-4">
          <Link to="/videos" className="hover:underline">
            Videos
          </Link>
          <Link to="/videos/upload" className="hover:underline">
            Upload
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <span>{user?.username}</span>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
          <button onClick={logout} className="text-red-600">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}