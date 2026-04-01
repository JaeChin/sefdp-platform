import { create } from 'zustand';
import { apiClient } from '@/lib/api-client';
import { setTokens, clearTokens, getRefreshToken } from '@/lib/auth';
import type { AuthTokens } from '@/lib/auth';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await apiClient.post<{ user: User; tokens: AuthTokens }>(
        '/auth/login',
        { email, password },
      );
      setTokens(response.tokens);
      set({ user: response.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    clearTokens();
    set({ user: null, isAuthenticated: false });
  },

  refreshToken: async () => {
    const refresh = getRefreshToken();
    if (!refresh) {
      set({ user: null, isAuthenticated: false });
      return;
    }

    try {
      const response = await apiClient.post<{ tokens: AuthTokens }>(
        '/auth/refresh',
        { refreshToken: refresh },
      );
      setTokens(response.tokens);
    } catch {
      clearTokens();
      set({ user: null, isAuthenticated: false });
    }
  },

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },
}));
