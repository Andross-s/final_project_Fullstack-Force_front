'use client';

import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipesList.module.css';

export type RecipeListItem = {
  _id: string;
  title?: string;
  name?: string;
  descr?: string;
  description?: string;
  time?: number | string;
  cookingTime?: number | string;
  calories?: number | string | null;
  cals?: number | string | null;
  thumb?: string;
  recipeImage?: string;
};

type RecipesListProps = {
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
      </div>
    </div>
  );
}

export default RecipesList;
