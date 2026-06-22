"use client";

import styles from "./RecipeCard.module.css";
import Link from "next/link";

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
  const calories =
    recipe.calories && recipe.calories > 0 ? recipe.calories : "—";

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

        <Link href={`/recipes/${recipe._id}`} className={styles.learnMoreBtn}>
          Learn more
        </Link>
      </div>
    </li>
  );
}
