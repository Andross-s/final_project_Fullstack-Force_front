import React from "react";
import { RecipeCard } from "./RecipeCard";
import styles from "./RecipeList.module.css";

interface Recipe {
  id: number;
  title: string;
  description: string;
  calories: string;
  time: number;
  image: string;
}

interface RecipeListProps {
  recipes: Recipe[];
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div className={styles.list}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          title={recipe.title}
          description={recipe.description}
          calories={recipe.calories}
          time={recipe.time}
          image={recipe.image}
        />
      ))}
    </div>
  );
};
