"use client";

import { useParams } from "next/navigation";
import { useRecipe } from "@/hooks/useRecipe";

import RecipeImage from "@/components/recipes/recipeDetails/RecipeImage/RecipeImage";
import RecipeTitle from "@/components/recipes/recipeDetails/RecipeTitle/RecipeTitle";
import GeneralInfo from "@/components/recipes/recipeDetails/GeneralInfo/GeneralInfo";
import RecipeSection from "@/components/recipes/recipeDetails/RecipeSection/RecipeSection";
import SaveButton from "@/components/recipes/recipeDetails/SaveButton/SaveButton";

import RecipeDetailsSkeleton from "@/components/recipes/recipeDetails/RecipeDetailsSkeleton";
import styles from "./RecipeDetails.module.css";

type IngredientItem = {
  _id: string;
  name: string;
  amount: string;
};

export default function RecipeDetailsPage() {
  const { id } = useParams();
 const recipeId = Array.isArray(id) ? id[0] : id;

const { data, isLoading, isError } = useRecipe(recipeId ?? "");

  if (isLoading) return <RecipeDetailsSkeleton />;
  if (isError) return <p className={styles.error}>Помилка завантаження рецепта</p>;

  const recipe = data.recipe;

  return (
    <div className={styles.wrapper}>
      <RecipeImage src={recipe.thumb} alt={recipe.title} />

      <RecipeTitle title={recipe.title} />

      <GeneralInfo time={recipe.time} calories={recipe.calories} />

      <SaveButton recipeId={recipe._id} />

      <RecipeSection title="Ingredients">
        <ul>
         {recipe.ingredients.map((item: IngredientItem) => (
  <li key={item._id}>
    {item.name} — {item.amount}
  </li>
))}
        </ul>
      </RecipeSection>

      <RecipeSection title="Instructions">
        <p>{recipe.instructions}</p>
      </RecipeSection>
    </div>
  );
}
