'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './ProfileNavigation.module.css';

export const ProfileNavigation = () => {
  const pathname = usePathname();
  
  return (
    <div className={styles.nav}>
      <Link 
        href="/profile/own" 
        className={`${styles.link} ${pathname === '/profile/own' ? styles.active : ''}`}
      >
      My Recipes
      </Link>
      <Link 
        href="/profile/favorites" 
        className={`${styles.link} ${pathname === '/profile/favorites' ? styles.active : ''}`}
      >
        Saved Recipes
      </Link>
    </div>
  );
};

