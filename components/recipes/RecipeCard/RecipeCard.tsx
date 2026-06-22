'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BookmarkIcon from '@/components/icon/bookmark-alternative.svg';
import ModalNotAutor from '@/components/auth/ModalNotAutor/ModalNotAutor';
import { useAuthStore } from '@/stores/authStore';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useQueryClient } from '@tanstack/react-query';
import type { RecipeListItem } from '../RecipesList/RecipesList';
import styles from './RecipeCard.module.css';

type RecipeCardProps = {
  id: string;
  title: string;
  description: string;
  time: string;
  calories?: number;
  thumb: string;
  type?: string;
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
}: RecipeCardProps) {
  const user = useAuthStore(state => state.user);
  const queryClient = useQueryClient();

  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const fav = useFavoritesStore(state =>
    type === 'favorites' || state.favoriteIds.includes(id)
  );

  // ДОДАНО: локальний стан модалки "потрібна авторизація" для гостей
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // ФІКС: раніше для незалогіненого користувача клік на favorite просто нічого не робив
  // (`user && toggleFavorite(...)`). Тепер показуємо модалку авторизації.
  const handleFavoriteClick = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (isProcessing) return;

    try {
      setIsProcessing(true);
      const wasFavorite = fav;
      const success = await toggleFavorite(id);

      if (!success) return;

      if (wasFavorite) {
        queryClient.setQueryData<RecipeListItem[]>(['favorites'], recipes =>
          recipes?.filter(recipe => recipe._id !== id) ?? []
        );
      } else {
        void queryClient.invalidateQueries({ queryKey: ['favorites'] });
      }
    } finally {
      setIsProcessing(false);
    }
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
          {/* ФІКС: раніше це був звичайний <button> без onClick — нікуди не вів */}
          <Link href={`/recipes/${id}`} className={styles.learnMore}>
            Learn More
          </Link>

          <button
            className={styles.favoriteBtn}
            onClick={handleFavoriteClick}
            disabled={isProcessing}
            aria-label="Toggle favorite"
            data-active={fav}
            style={{
              color: fav ? 'var(--light-brown)' : '#999',
              borderColor: fav ? 'var(--light-brown)' : 'var(--light-gray)',
              opacity: isProcessing ? 0.6 : 1,
            }}
          >
            <BookmarkIcon aria-hidden="true" />
          </button>
        </div>
      </div>

      {showAuthModal && (
        <ModalNotAutor onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}
