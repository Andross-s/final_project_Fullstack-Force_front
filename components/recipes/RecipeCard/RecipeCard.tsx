import Image from "next/image";
import styles from "./RecipeCard.module.css";

type RecipeCardProps = {
  title: string;
  description: string;
  time: string;
  calories?: number;
  image: string;
};

export default function RecipeCard({
  title,
  description,
  time,
  calories,
  image,
}: RecipeCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
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
          <span className={styles.time}>{time}</span>
          <span className={styles.calories}>
            {calories ? `${calories} kcal` : "—"}
          </span>
        </div>

        <div className={styles.buttons}>
          <button className={styles.learnMore}>Learn More</button>
          <button className={styles.favoriteBtn}>
            {/* Иконку добавим позже */}
            ♥
          </button>
        </div>
      </div>
    </div>
  );
}
