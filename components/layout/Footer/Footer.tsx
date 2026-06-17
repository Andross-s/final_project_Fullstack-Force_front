'use client';

import React from 'react';
import Link from 'next/link';

import styles from './Footer.module.css';
import LogoIcon from '../../icon/logo.svg';

type Props = {
  isUserAuthorized: boolean;
};

export const Footer = ({ isUserAuthorized }: Props) => {

  const handleAccountClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isUserAuthorized) {
      e.preventDefault();
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
          <div>© 2025 CookingCompanion</div>
        </div>

        <nav className={styles['footer-nav']}>
          <Link className={styles['footer-nav-link']} href="/recipes">
            Recipes
          </Link>

          <Link className={styles['footer-nav-link']} href="/profile" onClick={handleAccountClick}>
            Account
          </Link>
        </nav>
      </div>
    </footer>
  );
};
