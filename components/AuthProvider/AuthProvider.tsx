'use client';
import React, { useEffect } from 'react';
import { refreshSession, getUserById } from '../../lib/api/client';
import { useAuthStore } from '../../stores/authStore';

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const refreshData = await refreshSession();
        const userId = refreshData?.user?._id || refreshData?._id || localStorage.getItem('userId');

        if (userId) {
          const userData = await getUserById(userId);

          if (userData) {
            setUser(userData);
            localStorage.setItem('userId', userId);
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
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
}
