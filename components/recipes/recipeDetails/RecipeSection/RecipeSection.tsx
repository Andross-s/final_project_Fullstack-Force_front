import styles from "./RecipeSection.module.css";

export default function RecipeSection({ title, children }) {
  return (
    <div className={styles.block}>
      <h2 className={styles.heading}>{title}</h2>
      {children}
    </div>
  );
}
