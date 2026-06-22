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
  [key: string]: any;
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("perPage", "12");

        if (selectedCategory) params.set("category", selectedCategory);
        if (selectedIngredient) params.set("ingredient", selectedIngredient);

        const res = await fetch(`/api/recipes?${params.toString()}`);
        const data = await res.json();

        setRecipes(data.recipes || []);
        setHasMore((data.totalRecipes || 0) > (data.recipes?.length || 0));
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    }

    loadData();
  }, [page, selectedCategory, selectedIngredient]);

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedIngredient("");
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <Filters
        recipesCount={recipes.length}
        selectedCategory={selectedCategory}
        selectedIngredient={selectedIngredient}
        onCategoryChange={(value) => {
          setSelectedCategory(value);
          setPage(1);
        }}
        onIngredientChange={(value) => {
          setSelectedIngredient(value);
          setPage(1);
        }}
        onResetFilters={handleResetFilters}
      />

      <RecipesList
        recipes={recipes}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
}
