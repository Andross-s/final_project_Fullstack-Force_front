import React from "react";
import styles from "./RecipeCard.module.css";

interface RecipeCardProps {
  title: string;
  description: string;
  calories: string;
  time: number;
  image: string;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  description,
  calories,
  time,
  image,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />

        <div className={styles.timeBadge}>
          <img src="/icons/clock.svg" alt="time" className={styles.clockIcon} />
          <span>{time}</span>
        </div>
      </div>

      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.calories}>{calories}</div>

      <button className={styles.learnMore}>Learn more</button>
    </div>
  );
};
