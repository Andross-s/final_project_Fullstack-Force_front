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
  type?: string;
  onFavoriteToggled?: () => void;
};

export function RecipesList({ recipes, type, onFavoriteToggled }: RecipesListProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            title={recipe.title || recipe.name || ''}
            description={recipe.description || recipe.descr || ''}
            time={String(recipe.time || recipe.cookingTime || '')}
            calories={typeof recipe.calories === 'number' ? recipe.calories : undefined}
            thumb={recipe.thumb || recipe.recipeImage || ''}
            type={type}
            onFavoriteToggled={onFavoriteToggled}
          />
        ))}
      </ul>
    </div>
  );
}
