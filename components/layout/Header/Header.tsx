'use client';

import Link from 'next/link';
import Image from 'next/image';
import css from './Header.module.css';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import SignOutModal from './SignOutModal';
import { useAuthStore } from '@/stores/authStore';

export default function Header() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsSignOutModalOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          <Image src="/icons/logo-header.svg" alt="Tasteorama" width={165} height={46} />
        </Link>

        <nav className={css.navDesktop}>
          {isAuthenticated ? (
            <>
              <Link href="/" className={pathname === '/' ? css.activeLink : ''}>
                Recipes
              </Link>

              <Link href="/profile" className={pathname === '/profile' ? css.activeLink : ''}>
                My Profile
              </Link>

              <Link href="/add-recipe" className={css.registerDesktop}>
                Add Recipe
              </Link>

              <div className={css.desktopUserSection}>
                <div className={css.avatar}>{user?.name?.[0] || 'U'}</div>

                <span className={css.userName}>{user?.name}</span>

                <span className={css.divider}></span>

                <button
                  type="button"
                  className={css.logoutBtn}
                  onClick={() => setIsSignOutModalOpen(true)}
                >
                  <Image src="/icons/logaut_icon.svg" alt="Logout" width={24} height={24} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/" className={pathname === '/' ? css.activeLink : ''}>
                Recipes
              </Link>

              <Link href="/auth/login" className={pathname === '/auth/login' ? css.activeLink : ''}>
                Log in
              </Link>

              <Link href="/auth/register" className={css.registerDesktop}>
                Register
              </Link>
            </>
          )}
        </nav>

        <button
          type="button"
          className={css.burgerBtn}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Image src="/icons/burger-regular.svg" alt="Open menu" width={32} height={32} />
        </button>
      </div>

      {isMenuOpen && (
        <MobileMenu
          isAuthenticated={isAuthenticated}
          user={user ?? { name: 'Guest' }}
          onClose={() => setIsMenuOpen(false)}
          onLogoutClick={() => {
            setIsMenuOpen(false);
            setIsSignOutModalOpen(true);
          }}
        />
      )}

      {isSignOutModalOpen && <SignOutModal onClose={() => setIsSignOutModalOpen(false)} />}
    </header>
  );
}
