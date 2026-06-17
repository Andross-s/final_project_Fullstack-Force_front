import Image from "next/image";
import styles from "./RecipeCard.module.css";

import { useAuthStore } from "@/stores/authStore";
import { useFavoritesStore } from "@/stores/favoritesStore";

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
    <div className={styles.card}>
      {/* Зображення рецепта */}
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Контент картки */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {/* Опис рецепта (2 рядки) */}
        <p className={styles.description}>{description}</p>

        {/* Час та калорії */}
        <div className={styles.infoRow}>
          <span>{time}</span>
          <span>{calories ? `${calories} kcal` : "—"}</span>
        </div>

        {/* Кнопки */}
        <div className={styles.buttons}>
          <button className={styles.learnMore}>Learn More</button>

          {/* Кнопка обраного */}
          <button
            className={styles.favoriteBtn}
            onClick={() => user && toggleFavorite(id, user._id)}
            aria-label="Toggle favorite"
            style={{
              // Підсвітка кнопки, якщо рецепт у списку обраних
              color: fav ? "var(--light-brown)" : "#999",
              borderColor: fav ? "var(--light-brown)" : "var(--light-gray)",
            }}
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
}
