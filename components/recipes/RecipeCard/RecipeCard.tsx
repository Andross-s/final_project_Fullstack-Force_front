'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { useFavoritesStore } from '@/stores/favoritesStore';
import ModalNotAutor from '@/components/auth/ModalNotAutor/ModalNotAutor';
import ClockIcon from '@/components/icon/clock.svg';
import BookmarkIcon from '@/components/icon/bookmark-card.svg';
import styles from './RecipeCard.module.css';

type Recipe = {
  _id: string;
  title: string;
  thumb?: string;
  time?: number;
  calories?: number;
  description?: string;
};

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  const user = useAuthStore(state => state.user);
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const isFavorite = useFavoritesStore(state => state.isFavorite);

  const [isProcessing, setIsProcessing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const fav = isFavorite(recipe._id);

  const handleFavoriteClick = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (isProcessing) return;

    try {
      setIsProcessing(true);
      await toggleFavorite(recipe._id);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        {recipe.thumb && <Image src={recipe.thumb} alt={recipe.title} className={styles.image} />}
      </div>

      <div className={styles.timeRow}>
        <h3 className={styles.title}>{recipe.title}</h3>
        <span className={styles.metaPill}>
          <ClockIcon className={styles.metaIcon} />
          {recipe.time}
        </span>
      </div>

      <p className={styles.description}>{recipe.description}</p>

      <div className={styles.caloriesRow}>
        <span className={`${styles.metaPill} ${styles.caloriesPill}`}>
          {recipe.calories ? `~${recipe.calories} kcal` : '—'}
        </span>
      </div>

      <div className={styles.actions}>
        <Link href={`/recipes/${recipe._id}`} className={styles.learnMoreBtn}>
          Learn more
        </Link>

        <button
          type="button"
          className={`${styles.favoriteBtn} ${fav ? styles.favoriteBtnActive : ''}`}
          onClick={handleFavoriteClick}
          disabled={isProcessing}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <BookmarkIcon className={styles.favoriteIcon} />
        </button>
      </div>

      {showAuthModal && <ModalNotAutor onClose={() => setShowAuthModal(false)} />}
    </li>
  );
}
