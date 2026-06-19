"use client";

import Link from "next/link";
import styles from "./RecipesList.module.css";
import RecipeCard from "../RecipeCard/RecipeCard";

type Recipe = {
  _id: string;
  title: string;
  description: string;
  thumb: string;
  time: number;
  category?: { _id: string; name: string };
  ingredients?: { ingredient: { _id: string; name: string }; measure: string }[];
};

export default function RecipesList({ recipes }: { recipes: Recipe[] }) {
  if (!recipes || recipes.length === 0) {
    return <p className={styles.empty}>No recipes found</p>;
  }

  return (
    <ul className={styles.list}>
      {recipes.map((recipe) => (
        <li key={recipe._id} className={styles.item}>
          <RecipeCard
            recipe={recipe}
            image={recipe.thumb}
            title={recipe.title}
            description={recipe.description}
            time={recipe.time}
            id={recipe._id}
          />

          {/* CATEGORY LINK */}
          {recipe.category && (
            <Link
              href={`/categories/${recipe.category._id}`}
              className={styles.category}
            >
              {recipe.category.name}
            </Link>
          )}

          {/* INGREDIENT LINKS */}
          {recipe.ingredients && (
            <div className={styles.ingredients}>
              {recipe.ingredients.map((ing) => (
                <Link
                  key={ing.ingredient._id}
                  href={`/ingredients/${ing.ingredient.name}`}
                  className={styles.ingredient}
                >
                  {ing.ingredient.name}
                </Link>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
