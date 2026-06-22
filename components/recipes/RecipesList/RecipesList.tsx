"use client";

import React from "react";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import styles from "./RecipesList.module.css";

interface RecipesListProps {
  recipes: Recipe[];
}

export const RecipesList: React.FC<RecipesListProps> = ({ recipes }) => {
  return (
    <div className={styles.list}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          title={recipe.title}
          description={recipe.description}
          calories={String(recipe.calories)}
          time={recipe.time}
          image={recipe.image}
        />
      ))}
    </div>
  );
};
