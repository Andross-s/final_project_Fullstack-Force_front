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
  [key: string]: any;
};

type Props = {
  recipes: RecipeListItem[];
  hasMore?: boolean;
  onLoadMore?: () => void;
};

export default function RecipesList({ recipes, hasMore, onLoadMore }: Props) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </ul>

      {hasMore && onLoadMore && (
        <div className={styles.loadMoreWrapper}>
          <button type="button" onClick={onLoadMore}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
