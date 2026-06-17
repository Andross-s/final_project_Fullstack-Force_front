import Link from 'next/link';
import Image from 'next/image';
import styles from './NotFoundRecipe.module.css';

export default function NotFoundRecipe() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/not-found-plate.jpg"
          alt="Recipe not found"
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>
      <h2 className={styles.code}>404</h2>
      <p className={styles.text}>Recipe not found</p>
      <Link href="/" className={styles.btn}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.5 12.0023L7.49996 12.0023M11.5377 7.96306L7.49996 12.0023L11.5377 16.0414" stroke="white" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Home
      </Link>
    </div>
  );
}