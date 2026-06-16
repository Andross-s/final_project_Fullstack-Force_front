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
      const savedUserId = localStorage.getItem('userId');

      if (!savedUserId) {
        clearIsAuthenticated();
        return;
      }

      try {
        await refreshSession();

        const userData = await getUserById(savedUserId);

        if (userData) {
          setUser(userData);
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        console.error('Auth restore error:', error);
        localStorage.removeItem('userId');
        clearIsAuthenticated();
      }
    };

    void restoreSession();
  }, [setUser, clearIsAuthenticated]);

  return children;
}
