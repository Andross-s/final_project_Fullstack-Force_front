"use client";

import { useEffect, useState } from "react";
import Filters from "@/components/recipes/Filters/Filters";
import RecipesList from "@/components/recipes/RecipesList/RecipesList";

type Recipe = {
  _id: string;
  title: string;
  thumb?: string;
  time?: number;
  calories?: number;
  description?: string;
  categoryId?: string;
  ingredients?: string[];
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const params = new URLSearchParams();
        params.set("page", "1");
        params.set("perPage", "12");

        if (selectedCategory) params.set("category", selectedCategory);
        if (selectedIngredient) params.set("ingredient", selectedIngredient);

        const res = await fetch(`/api/recipes?${params.toString()}`);
        const data = await res.json();

        setRecipes(data.recipes || []);
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    }

    loadData();
  }, [selectedCategory, selectedIngredient]);

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedIngredient("");
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <Filters
        recipesCount={recipes.length}
        selectedCategory={selectedCategory}
        selectedIngredient={selectedIngredient}
        onCategoryChange={(value) => setSelectedCategory(value)}
        onIngredientChange={(value) => setSelectedIngredient(value)}
        onResetFilters={handleResetFilters}
      />

      <RecipesList recipes={recipes} />
    </div>
  );
}
