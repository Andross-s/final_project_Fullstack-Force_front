import { ReactNode } from "react";
import styles from "./RecipeSection.module.css";

type RecipeSectionProps = {
  title: string;
  children: ReactNode;
};

export default function RecipeSection({
  title,
  children,
}: RecipeSectionProps) {
  return (
    <div className={styles.block}>
      <h2 className={styles.heading}>{title}</h2>
      {children}
    </div>
  );
}