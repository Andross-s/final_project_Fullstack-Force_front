"use client";

import styles from "./RecipesList.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";

export type RecipeListItem = {
  _id: string;
  title: string;
  description: string;
  thumb: string;
  time: number;
  calories?: number;
};

export default function RecipesList({ recipes }: { recipes: RecipeListItem[] }) {
  if (!recipes || recipes.length === 0) {
    return <p className={styles.empty}>No recipes found</p>;
  }

  return (
    <ul className={styles.list}>
      {recipes.map((recipe) => (
        <li key={recipe._id} className={styles.item}>
          <RecipeCard
            id={recipe._id}
            title={recipe.title}
            description={recipe.description}
            image={recipe.thumb}
            time={recipe.time}
          />
        </li>
      ))}
    </ul>
  );
}
