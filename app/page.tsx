"use client";

import { useState } from "react";
import SearchBox from "../components/recipes/SearchBox/SearchBox";
import styles from "./page.module.css";
import RecipesList from "../components/recipes/RecipesList/RecipesList";
import toast from "react-hot-toast";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
const [recipes, setRecipes] = useState([]);
const [isLoading, setIsLoading] = useState(false);

  const fetchRecipes = async (query: string) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `/api/recipes?query=${encodeURIComponent(query)}`
    );

    const data = await response.json();

setRecipes(data.recipes || []);

if (data.totalRecipes === 0) {
  toast.error(`No recipes found for "${query}"`);
}

  } catch (error) {
    console.error("Fetch recipes error:", error);
  } finally {
    setIsLoading(false);
  }
};

  const handleSearch = async (value: string) => {
    setSearchQuery(value);

    await fetchRecipes(value);
  };

  return (
    <main className={styles.page}>
      <section className={styles.searchSection}>
        <SearchBox onSearch={handleSearch} />
        {isLoading && <p>Loading...</p>}
        {recipes.length > 0 && (
  <RecipesList recipes={recipes} />
)}
      </section>
    </main>
  );
}