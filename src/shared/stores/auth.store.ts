import { create } from 'zustand';

interface User{
	id: string;
	email: string;
	username: string;
}

interface AuthStore{
	// state
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;

	// actions
	setUser: (user: User | null) => void;
	setIsAuthenticated: (isAuth: boolean) => void;
	setIsLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('access_token'),
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuth) => set({ isAuthenticated: isAuth }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  logout: () => {
    localStorage.removeItem('access_token');
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));