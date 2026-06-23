"use client";

import styles from "./RecipeCard.module.css";
import Link from "next/link";

type Recipe = {
  _id: string;
  title: string;
  thumb?: string;
  time?: number;
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
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        {recipe.thumb && (
          <img
            src={recipe.thumb}
            alt={recipe.title}
            className={styles.image}
          />
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{recipe.title}</h3>

        {recipe.description && (
          <p className={styles.description}>{recipe.description}</p>
        )}

        <div className={styles.metaRow}>
          <div className={styles.metaGroup}>
            <span className={styles.metaLabel}>Time</span>
            <span className={styles.metaValue}>
              {recipe.time ? `${recipe.time} min` : "—"}
            </span>
          </div>
          <div className={styles.metaGroup}>
            <span className={styles.metaLabel}>Calories</span>
            <span className={styles.metaValue}>{calories}</span>
          </div>
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
    </li>
  );
}
