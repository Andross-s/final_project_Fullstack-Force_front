"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { useAuthStore } from "@/stores/authStore";
import ModalNotAutor from "@/components/auth/ModalNotAutor/ModalNotAutor";
import styles from "./RecipeCard.module.css";

type Props = {
  id: string;
  title: string;
  description: string;
  image: string;
  time?: number;
  likes?: number;
};

// Картка рецепта на головній сторінці
export default function RecipeCard({
  id,
  title,
  description,
  image,
  time,
  likes = 0,
}: Props) {
  const user = useAuthStore((s) => s.user);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);

  const active = isFavorite(id);

  // локальний стан модалки авторизації
  const [showAuthModal, setShowAuthModal] = useState(false);

  // клік по кнопці "в обране"
  const handleFavoriteClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    toggleFavorite(id, user._id);
  };

  return (
    <div className={styles.card}>
      {/* фото */}
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          className={styles.image}
          sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 25vw"
        />

        {/* кнопка обраного */}
        <button
          className={`${styles.favoriteBtn} ${active ? styles.active : ""}`}
          onClick={handleFavoriteClick}
          aria-label="Toggle favorite"
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
              2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>

      {/* контент */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>

        <div className={styles.infoRow}>
          {/* час */}
          {time && <span className={styles.time}>{time} min</span>}

          {/* лайки */}
          <span className={styles.likes}>
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
              2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {likes}
          </span>
        </div>

        {/* кнопка переходу */}
        <Link href={`/recipes/${id}`} className={styles.learnMore}>
          Learn More
        </Link>
      </div>

      {/* модалка авторизації */}
      {showAuthModal && (
        <ModalNotAutor onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}
