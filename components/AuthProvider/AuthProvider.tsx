// 'use client';

// import React, { useEffect } from 'react';
// import { checkSession, getMe } from '@/lib/api/clientApi';
// import { useAuthStore } from '@/lib/store/authStore';

// type AuthProviderProps = {
//   children: React.ReactNode;
// };

// export default function AuthProvider({ children }: AuthProviderProps) {
//   const setUser = useAuthStore(state => state.setUser);
//   const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const isAuthenticated = await checkSession();

//         if (isAuthenticated) {
//           const user = await getMe();
//           if (user) setUser(user);
//         } else {
//           clearIsAuthenticated();
//         }
//       } catch {
//         clearIsAuthenticated();
//       }
//     };
//     void getUser();
//   }, [setUser, clearIsAuthenticated]);

//   return children;
// }
