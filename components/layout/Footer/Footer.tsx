'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

import styles from './Footer.module.css';
import LogoIcon from '../../icon/logo.svg';
import ModalAccount from '../../auth/ModalAccount/ModalAccount';

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');
  const user = useAuthStore(state => state.user);

  const handleAccountClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <footer className={styles['footer-container']}>
      <div className={styles['footer-content']}>
        <Link href="/" className={styles['footer-logo']}>
          <LogoIcon className={styles['footer-logo-icon']} aria-hidden="true" />
          <span className={styles['brand-text']}>Tasteorama</span>
        </Link>

        <div className={styles['footer-credits']}>
          <div>© 2026 Tasteorama. All rights reserved.</div>
        </div>

        <nav className={styles['footer-nav']}>
          <Link className={styles['footer-nav-link']} href="/">
            Recipes
          </Link>

          {!isAuthPage && (
            <Link
              className={styles['footer-nav-link']}
              href="/profile/own"
              onClick={handleAccountClick}
            >
              Account
            </Link>
          )}
          {isModalOpen && <ModalAccount onClose={() => setIsModalOpen(false)} />}
        </nav>
      </div>
    </footer>
  );
};
