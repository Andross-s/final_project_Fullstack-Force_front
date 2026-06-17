import styles from "./RecipeTitle.module.css";

export default function RecipeTitle({ title }) {
  return <h1 className={styles.title}>{title}</h1>;
}
