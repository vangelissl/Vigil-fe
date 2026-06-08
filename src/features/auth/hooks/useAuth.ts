import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../../../shared/stores/auth.store';
import { useUIStore } from '../../../shared/stores/ui.store';
import { authAPI } from '../api/auth.api';
import { type LoginFormData, type RegisterFormData } from '../utils/validation';

export function useAuth() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const addToast = useUIStore((state) => state.addToast);

  const login = async (data: LoginFormData) => {
    try {
      const response = await authAPI.login(data);
      localStorage.setItem('access_token', response.access_token);
      setUser(response.user);
      setIsAuthenticated(true);
      addToast('Login successful!', 'success');
      navigate({ to: '/' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Login failed';
      addToast(message, 'error');
      throw error;
    }
  };

  const register = async (data: RegisterFormData) => {
    try {
      const response = await authAPI.register(data);
      localStorage.setItem('access_token', response.access_token);
      setUser(response.user);
      setIsAuthenticated(true);
      addToast('Account created!', 'success');
      navigate({ to: '/' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.response?.data?.detail || 'Registration failed';
      addToast(message, 'error');
      throw error;
    }
  };

  const logout = () => {
    useAuthStore.getState().logout();
    addToast('Logged out', 'info');
    navigate({ to: '/login' });
  };

  return { login, register, logout };
}