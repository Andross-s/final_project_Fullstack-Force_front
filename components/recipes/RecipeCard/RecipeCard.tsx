'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BookmarkIcon from '@/components/icon/bookmark-alternative.svg';
import ModalNotAutor from '@/components/auth/ModalNotAutor/ModalNotAutor';
import { useAuthStore } from '@/stores/authStore';
import { useFavoritesStore } from '@/stores/favoritesStore';
import styles from './RecipeCard.module.css';

type RecipeCardProps = {
  id: string;
  title: string;
  description: string;
  time: string;
  calories?: number;
  thumb: string;
  type?: string;
  onFavoriteToggled?: () => void;
};

// Картка рецепта на MainPage
export default function RecipeCard({
  id,
  title,
  description,
  time,
  calories,
  thumb,
  type,
  onFavoriteToggled,
}: RecipeCardProps) {
  const user = useAuthStore(state => state.user);

  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const isFavorite = useFavoritesStore(state => state.isFavorite);

  const fav = isFavorite(id);

  // ДОДАНО: локальний стан модалки "потрібна авторизація" для гостей
  const [showAuthModal, setShowAuthModal] = useState(false);

  // ФІКС: раніше для незалогіненого користувача клік на favorite просто нічого не робив
  // (`user && toggleFavorite(...)`). Тепер показуємо модалку авторизації.
  const handleFavoriteClick = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    await toggleFavorite(id);
    onFavoriteToggled?.();
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={thumb}
          alt={title}
          fill
          className={styles.image}
          sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 25vw"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.infoRow}>
          <span>{time}</span>
          <span>{calories ? `${calories} kcal` : '—'}</span>
        </div>

        <div className={styles.buttons}>
  <Link
    href={`/recipes/${id}`}
    className={`${styles.learnMore} ${type === 'own' ? styles.learnMoreFull : ''}`}
  >
    Learn More
  </Link>
  {type !== 'own' && (
    <button
      className={styles.favoriteBtn}
      onClick={handleFavoriteClick}
      aria-label="Toggle favorite"
      style={{
        color: fav ? 'var(--light-brown)' : '#999',
        borderColor: fav ? 'var(--light-brown)' : 'var(--light-gray)',
      }}
    >
      <BookmarkIcon aria-hidden="true" />
    </button>
  )}
</div>
      </div>

      {showAuthModal && (
        <ModalNotAutor onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}
