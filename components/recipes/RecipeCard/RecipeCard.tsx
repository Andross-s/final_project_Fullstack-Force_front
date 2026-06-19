"use client";

import Link from "next/link";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { useAuthStore } from "@/stores/authStore";
import styles from "./RecipeCard.module.css";

type Props = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function RecipeCard({ id, title, description, image }: Props) {
  const user = useAuthStore((s) => s.user);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);

  const active = isFavorite(id);

  const handleFavorite = () => {
    if (!user) {
      console.warn("User not logged in");
      return;
    }
    toggleFavorite(id, user._id);
  };

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />

      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{description}</div>

        <div className={styles.bottomRow}>
          <Link href={`/recipes/${id}`} className={styles.learnMore}>
            Learn More
          </Link>

          <div
            className={`${styles.favorite} ${active ? styles.active : ""}`}
            onClick={handleFavorite}
          >
            <svg viewBox="0 0 24 24">
              <path
                className={styles.fill}
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
              <path
                className={styles.stroke}
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
