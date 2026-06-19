'use client';
import styles from './LoadMoreBtn.module.css';


interface LoadMoreBtnProps {
  onClick: () => void;      
  isLoading?: boolean;     
}

export const LoadMoreBtn = ({ onClick, isLoading = false }: LoadMoreBtnProps) => {
  return (
    <div className={styles.container}>
      <button onClick={onClick} disabled={isLoading} className={styles.button}>
        {isLoading ? 'Завантаження...' : 'Load More'}
      </button>
    </div>
  );
};
