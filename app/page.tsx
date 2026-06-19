"use client";

import { useState } from "react";
import SearchBox from "../components/recipes/SearchBox/SearchBox";
import Filters from "@/components/recipes/Filters/Filters";
import RecipesList from "../components/recipes/RecipesList/RecipesList";
import toast from "react-hot-toast";
import styles from "./page.module.css";

type Recipe = {
  _id: string;
  title: string;
  description: string;
  time: number;
  calories?: number | null;
  thumb: string;
};

type FetchRecipesParams = {
  query?: string;
  category?: string;
  ingredient?: string;
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchRecipes = async ({
    query = searchQuery,
    category = selectedCategory,
    ingredient = selectedIngredient,
  }: FetchRecipesParams = {}) => {
    try {
      setIsLoading(true);

      const params = new URLSearchParams();

      if (query) {
        params.set("query", query);
      }

      if (category) {
        params.set("category", category);
      }

      if (ingredient) {
        params.set("ingredient", ingredient);
      }

     const response = await fetch(`/api/recipes?${params.toString()}`);
const data = await response.json();

if (!response.ok) {
  setRecipes([]);
  setTotalRecipes(0);
  toast.error(data.message || "Failed to load recipes");
  return;
}

const receivedRecipes = data.recipes || [];

setRecipes(receivedRecipes);
setTotalRecipes(data.totalRecipes || 0);
setHasSearched(true);

      if (data.totalRecipes === 0) {
        toast.error("No recipes found");
      }
    } catch (error) {
      console.error("Fetch recipes error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    setSearchQuery(value);

    await fetchRecipes({
      query: value,
    });
  };

  const handleCategoryChange = async (value: string) => {
    setSelectedCategory(value);

    await fetchRecipes({
      category: value,
    });
  };

  const handleIngredientChange = async (value: string) => {
    setSelectedIngredient(value);

    await fetchRecipes({
      ingredient: value,
    });
  };

 const handleResetFilters = async () => {
  setSelectedCategory("");
  setSelectedIngredient("");

  await fetchRecipes({
    query: searchQuery,
    category: "",
    ingredient: "",
  });
};

  const shouldShowNoMatch = !isLoading && hasSearched && recipes.length === 0;

  return (
    <main className={styles.page}>
      <section className={styles.searchSection}>
        <SearchBox onSearch={handleSearch} />

        <Filters
          recipesCount={totalRecipes}
          selectedCategory={selectedCategory}
          selectedIngredient={selectedIngredient}
          onCategoryChange={handleCategoryChange}
          onIngredientChange={handleIngredientChange}
          onResetFilters={handleResetFilters}
        />

        {isLoading && <p>Loading...</p>}

{shouldShowNoMatch && <p>No recipes found</p>}

{!isLoading && recipes.length > 0 && (
  <RecipesList recipes={recipes} />
)}
      </section>
    </main>
  );
}