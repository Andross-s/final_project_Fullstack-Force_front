"use client";

import RecipeCard from "@/components/recipes/RecipeCard/RecipeCard";
import styles from "./RecipesList.module.css";

export type RecipeListItem = {
  _id: string;
  title: string;
  thumb?: string;
  time?: number;
  calories?: number;
  description?: string;
  categoryId?: string;
  ingredients?: string[];
  [key: string]: unknown;
};

type Props = {
  recipes: RecipeListItem[];
  type?: string;
  onFavoriteToggled?: () => void;
};

export default function RecipesList({ recipes, type, onFavoriteToggled }: Props) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            type={type}
            onFavoriteToggled={onFavoriteToggled}/>
        ))}
      </ul>
    </div>
  );
}
