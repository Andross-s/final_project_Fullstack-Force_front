"use client";

import { Oval } from "react-loader-spinner";
import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
  isLoading?: boolean;
}

export const LoadMoreBtn = ({ onClick, isLoading = false }: LoadMoreBtnProps) => {
  return (
    <div className={styles.container}>
      <button onClick={onClick} disabled={isLoading} className={styles.button}>
        {isLoading ? (
          <Oval height={18} width={18} strokeWidth={5} color="#fff" />
        ) : (
          "Load More"
        )}
      </button>
    </div>
  );
};
