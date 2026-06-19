import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipesList.module.css";

type Recipe = {
  _id: string;
  title?: string;
  name?: string;
  description: string;
  time?: number;
  cookingTime?: number;
  calories?: number | null;
  thumb?: string;
  recipeImage?: string;
};

type RecipesListProps = {
  recipes: Recipe[];
  type?: string;
};

export function RecipesList({ recipes }: RecipesListProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            title={recipe.title || recipe.name || ""}
            description={recipe.description}
            time={String(recipe.time || recipe.cookingTime || "")}
            calories={recipe.calories ?? undefined}
            thumb={recipe.thumb || recipe.recipeImage || ""}  
          />
        ))}
      </div>

      <button className={styles.loadMore}>Load More</button>
    </div>
  );
}

export default RecipesList;
