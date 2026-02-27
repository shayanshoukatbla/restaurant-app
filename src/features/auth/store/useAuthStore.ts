import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '@app-types/api';
import { authApi } from '@features/auth/api/authApi';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  isVerifying: boolean;

  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  setHydrated: () => void;
  verifySession: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isHydrated: false,
      isVerifying: false,

      setAuth: (token: string, user: User) => {
        set({ token, user, isAuthenticated: true });
      },

      clearAuth: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },

      setHydrated: () => {
        set({ isHydrated: true });
      },

      verifySession: async () => {
        const { token, clearAuth } = get();
        if (!token) return;

        set({ isVerifying: true });
        try {
          const { user } = await authApi.verify();
          set({ user, isAuthenticated: true });
        } catch {
          clearAuth();
        } finally {
          set({ isVerifying: false });
        }
      },

      logout: async () => {
        const { clearAuth } = get();
        try {
          await authApi.logout();
        } finally {
          clearAuth();
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
