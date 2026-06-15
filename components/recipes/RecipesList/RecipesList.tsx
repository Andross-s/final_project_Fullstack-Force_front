import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipesList.module.css";

type Recipe = {
  id: string;
  title: string;
  description: string;
  time: string;
  calories?: number;
  image: string;
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
            key={recipe.id}
            title={recipe.title}
            description={recipe.description}
            time={recipe.time}
            calories={recipe.calories}
            image={recipe.image}
          />
        ))}
      </div>

    
      <button className={styles.loadMore}>Load More</button>
    </div>
  );
}
