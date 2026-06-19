import styles from "./RecipeTitle.module.css";

type RecipeTitleProps = {
  title: string;
};

export default function RecipeTitle({
  title,
}: RecipeTitleProps) {
  return <h1 className={styles.title}>{title}</h1>;
}