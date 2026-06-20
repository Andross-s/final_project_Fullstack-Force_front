"use client";

import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { DM_Sans, Montserrat } from 'next/font/google';
import './globals.css';
import Layout from '@/components/layout/Layout/Layout';
import QueryProvider from '../providers/TanStackProvider';

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useFavoritesStore } from "@/stores/favoritesStore";

import AuthProvider from '@/components/AuthProvider/AuthProvider';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tasteorama',
  description: 'Save, search and share culinary recipes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const loadFavorites = useFavoritesStore((s) => s.loadFavorites);

  useEffect(() => {
    if (user) {
      loadFavorites(user._id);
    }
  }, [user]);

  return (
    <html lang="uk">
      <body className={`${montserrat.variable} ${dmSans.variable}`}>
        <QueryProvider>
          <AuthProvider>
            <Layout>{children}</Layout>
            <Toaster position="top-right" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
