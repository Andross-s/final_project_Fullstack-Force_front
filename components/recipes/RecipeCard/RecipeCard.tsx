"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { useAuthStore } from "@/stores/authStore";
import ModalNotAutor from "@/components/auth/ModalNotAutor/ModalNotAutor";
import styles from "./RecipeCard.module.css";

const BookmarkIcon = ({ active }: { active: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={active ? "#b88a5a33" : "none"}
    stroke={active ? "var(--light-brown)" : "#999"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

export default function RecipeCard({
  id,
  title,
  description,
  image,
  time,
  likes = 0,
}) {
  const user = useAuthStore((s) => s.user);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);

  const active = isFavorite(id);

  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleFavoriteClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    toggleFavorite(id, user._id);
  };

  // Fallback-картинка, если image пустой
  const imageSrc =
    image ||
    "https://res.cloudinary.com/dkiruwtcx/image/upload/q_auto/f_auto/v1781512091/Photo_dkn9mn.png";

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>

        <div className={styles.infoRow}>
          {time && <span className={styles.time}>{time} min</span>}
          <span className={styles.likes}>❤️ {likes}</span>
        </div>

        <div className={styles.bottomRow}>
          <Link href={`/recipes/${id}`} className={styles.learnMore}>
            Learn More
          </Link>

          <button
            className={`${styles.favoriteBtn} ${active ? styles.active : ""}`}
            onClick={handleFavoriteClick}
          >
            <BookmarkIcon active={active} />
          </button>
        </div>
      </div>

      {showAuthModal && (
        <ModalNotAutor onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}
