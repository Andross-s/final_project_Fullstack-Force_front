import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipesList.module.css";

type Recipe = {
  _id: string;
  title: string;
  description: string;
  time: number;
  calories?: number | null;
  thumb: string;
};

type RecipesListProps = {
  recipes: Recipe[];
};

export default function RecipesList({ recipes }: RecipesListProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            title={recipe.title}
            description={recipe.description}
            time={String(recipe.time)}
            calories={recipe.calories ?? undefined}
            image={recipe.thumb}
/>
        ))}
      </div>

      <button className={styles.loadMore}>Load More</button>
    </div>
  );
}