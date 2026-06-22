'use client';
import React, { useEffect } from 'react';
import { refreshSession, getUserById } from '../../lib/api/client';
import { useAuthStore } from '../../stores/authStore';
import { useFavoritesStore } from '../../stores/favoritesStore';

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);
  const loadFavorites = useFavoritesStore(state => state.loadFavorites);

  useEffect(() => {
    const restoreSession = async () => {
      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) {
        clearIsAuthenticated();
        return;
      }
      try {
        const refreshData = await refreshSession();
        const userId = refreshData?.user?._id || refreshData?._id || localStorage.getItem('userId');

        if (userId) {
          const userData = await getUserById(userId);

          if (userData) {
            setUser(userData);
            localStorage.setItem('userId', userId);
            void loadFavorites();
            return;
          }
        }

        clearIsAuthenticated();
        localStorage.removeItem('userId');
      } catch (error) {
        console.warn('[Auth] session refresh failed', error);
        localStorage.removeItem('userId');
        clearIsAuthenticated();
      }
    };

    void restoreSession();
  }, [setUser, clearIsAuthenticated, loadFavorites]);

  return <>{children}</>;
}
