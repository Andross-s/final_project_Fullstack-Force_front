"use client";

import { useEffect, useState } from "react";
import Filters from "@/components/recipes/Filters/Filters";
import RecipesList from "@/components/recipes/RecipesList/RecipesList";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        // RECIPES
        const resRecipes = await fetch("/api/recipes");
        const recipesData = await resRecipes.json();

        console.log("RECIPES:", recipesData.recipes); // ← ВАЖНО

        setRecipes(recipesData.recipes);

        // CATEGORIES
        const resCategories = await fetch("/api/categories");
        const categoriesData = await resCategories.json();
        setCategories(categoriesData);

        // INGREDIENTS
        const resIngredients = await fetch("/api/ingredients");
        const ingredientsData = await resIngredients.json();
        setIngredients(ingredientsData);

      } catch (err) {
        console.error("Failed to load data:", err);
      }
    }

    loadData();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(recipe.categoryId);

    const matchIngredients =
      selectedIngredients.length === 0 ||
      recipe.ingredients?.some((ing: string) =>
        selectedIngredients.includes(ing)
      );

    return matchCategory && matchIngredients;
  });

  return (
    <div style={{ padding: "20px 0" }}>
      <Filters
        categories={categories}
        ingredients={ingredients}
        selectedCategories={selectedCategories}
        selectedIngredients={selectedIngredients}
        onCategoriesChange={setSelectedCategories}
        onIngredientsChange={setSelectedIngredients}
        onReset={() => {
          setSelectedCategories([]);
          setSelectedIngredients([]);
        }}
      />

      <RecipesList recipes={filteredRecipes} />
    </div>
  );
}
