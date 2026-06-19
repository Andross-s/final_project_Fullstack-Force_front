'use client';

import Image from 'next/image';
import Link from 'next/link';
import BookmarkIcon from '@/components/icon/bookmark-alternative.svg';
import { useAuthStore } from '@/stores/authStore';
import { useFavoritesStore } from '@/stores/favoritesStore';
import styles from './RecipeCard.module.css';

type RecipeCardProps = {
  id: string; // ← додано, щоб працювало обране
  title: string;
  description: string;
  time: string;
  calories?: number;
  image: string;
};

export default function RecipeCard({
  id,
  title,
  description,
  time,
  calories,
  image,
}: RecipeCardProps) {
  // Отримуємо користувача зі стору авторизації

  const user = useAuthStore(state => state.user);
  // Методи роботи з обраним
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const isFavorite = useFavoritesStore(state => state.isFavorite);
  // Перевіряємо, чи рецепт у списку обраних
  const fav = isFavorite(id);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image || '/images/not-found-plate.jpg'}
          alt={title}
          fill
          className={styles.image}
          sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 25vw"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>
          {time && <span className={styles.time}>~{time}</span>}
        </div>

        <p className={styles.description}>{description}</p>
        <p className={styles.calories}>{calories ? `${calories} kcal` : '-'}</p>

        <div className={styles.buttons}>
          <Link className={styles.learnMore} href={`/recipes/${id}`}>
            Learn more
          </Link>

          <button
            className={styles.favoriteBtn}
            onClick={() => user && toggleFavorite(id, user._id)}
            aria-label="Toggle favorite"
            data-active={fav}
            type="button"
          >
            <BookmarkIcon aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
