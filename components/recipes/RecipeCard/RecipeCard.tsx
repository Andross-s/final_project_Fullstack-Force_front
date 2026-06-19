import Image from "next/image";
import styles from "./RecipeCard.module.css";

import { useAuthStore } from "@/stores/authStore";
import { useFavoritesStore } from "@/stores/favoritesStore";

type RecipeCardProps = {
  id: string;
  title: string;
  description: string;
  time: string;
  calories?: number;
  thumb: string; 
};

export default function RecipeCard({
  id,
  title,
  description,
  time,
  calories,
  thumb,
}: RecipeCardProps) {
  const user = useAuthStore(state => state.user);

  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const isFavorite = useFavoritesStore(state => state.isFavorite);

  const fav = isFavorite(id);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={thumb}
          alt={title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.infoRow}>
          <span>{time}</span>
          <span>{calories ? `${calories} kcal` : "—"}</span>
        </div>

        <div className={styles.buttons}>
          <button className={styles.learnMore}>Learn More</button>

          <button
            className={styles.favoriteBtn}
            onClick={() => user && toggleFavorite(id, user._id)}
            aria-label="Toggle favorite"
            style={{
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
