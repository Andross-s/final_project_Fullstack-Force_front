"use client";

import { useEffect, useState } from "react";
import Filters from "@/components/recipes/Filters/Filters";
import { RecipesList } from "@/components/recipes/RecipesList/RecipesList";
import { Recipe } from "@/types/recipe";

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

        const normalized: Recipe[] = (data.recipes || []).map((r: any) => ({
          id: r._id,
          title: r.title,
          description: r.description || "",
          time: r.time || 0,
          calories: r.calories || 0,
          image: r.thumb || "/default-image-desktop.jpg",
        }));

        setRecipes(normalized);
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
        onCategoryChange={setSelectedCategory}
        onIngredientChange={setSelectedIngredient}
        onResetFilters={handleResetFilters}
      />

      <RecipesList recipes={recipes} />
    </div>
  );
}
