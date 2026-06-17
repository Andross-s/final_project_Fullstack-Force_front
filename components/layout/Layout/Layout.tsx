import { ReactNode } from 'react';
import styles from './Layout.module.css';
import Header from '../Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer isUserAuthorized={false} />
    </div>
  );
}
