'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import SearchBox from "../components/recipes/SearchBox/SearchBox";
import Filters from "../components/recipes/Filters/Filters";
import RecipesList from "../components/recipes/RecipesList/RecipesList";

import styles from "./page.module.css";
import toast from "react-hot-toast";

type FiltersState = {
  category: string;
  ingredient: string;
  maxTime: string;
  maxCalories: string;
};

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // 🧩 Локальні фільтри
  const [filters, setFilters] = useState<FiltersState>({
    category: "",
    ingredient: "",
    maxTime: "",
    maxCalories: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  // ============================================================
  // 📌 1. ЧИТАЄМО ФІЛЬТРИ З URL ПРИ ЗАВАНТАЖЕННІ
  // ============================================================
  useEffect(() => {
    const initialFilters: FiltersState = {
      category: searchParams.get("category") || "",
      ingredient: searchParams.get("ingredient") || "",
      maxTime: searchParams.get("maxTime") || "",
      maxCalories: searchParams.get("maxCalories") || "",
    };

    const initialSearch = searchParams.get("search") || "";

    setFilters(initialFilters);
    setSearchQuery(initialSearch);

    fetchRecipes(1, initialFilters, initialSearch);
  }, []);

  // ============================================================
  // 📌 2. ОНОВЛЮЄМО URL ПРИ ЗМІНІ ФІЛЬТРІВ
  // ============================================================
  const updateURL = (
    pageValue: number,
    filters: FiltersState,
    search: string,
  ) => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (filters.category) params.set("category", filters.category);
    if (filters.ingredient) params.set("ingredient", filters.ingredient);
    if (filters.maxTime) params.set("maxTime", filters.maxTime);
    if (filters.maxCalories) params.set("maxCalories", filters.maxCalories);

    params.set("page", String(pageValue));

    router.replace(`/?${params.toString()}`);
  };

  // ============================================================
  // 📌 3. ЗАПИТ НА БЕКЕНД
  // ============================================================
  const fetchRecipes = async (
    pageValue: number,
    filtersValue: FiltersState,
    searchValue: string,
  ) => {
    try {
      setIsLoading(true);

      const params = new URLSearchParams();

      if (searchValue) params.set("search", searchValue);
      if (filtersValue.category) params.set("category", filtersValue.category);
      if (filtersValue.ingredient)
        params.set("ingredient", filtersValue.ingredient);
      if (filtersValue.maxTime) params.set("maxTime", filtersValue.maxTime);
      if (filtersValue.maxCalories)
        params.set("maxCalories", filtersValue.maxCalories);

      params.set("page", String(pageValue));
      params.set("perPage", "12");

      const response = await fetch(`/api/recipes?${params.toString()}`);
      const data = await response.json();

      if (pageValue === 1) {
        setRecipes(data.recipes || []);
      } else {
        setRecipes((prev) => [...prev, ...(data.recipes || [])]);
      }

      setHasMore(data.hasMore || false);
      setPage(pageValue);

      if (!data.recipes || data.recipes.length === 0) {
        toast.error("No recipes found");
      }
    } catch (error) {
      console.error("Fetch recipes error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // 📌 4. Пошук
  // ============================================================
  const handleSearch = async (value: string) => {
    setSearchQuery(value);
    updateURL(1, filters, value);
    fetchRecipes(1, filters, value);
  };

  // ============================================================
  // 📌 5. Зміна фільтрів
  // ============================================================
  const handleFiltersChange = (next: FiltersState) => {
    setFilters(next);
  };

  const applyFilters = () => {
    updateURL(1, filters, searchQuery);
    fetchRecipes(1, filters, searchQuery);
  };

  // ============================================================
  // 📌 6. Load More
  // ============================================================
  const loadMore = () => {
    const nextPage = page + 1;
    updateURL(nextPage, filters, searchQuery);
    fetchRecipes(nextPage, filters, searchQuery);
  };

  return (
    <main className={styles.page}>
      <section className={styles.searchSection}>
        <SearchBox onSearch={handleSearch} />

        <Filters onChange={handleFiltersChange} />

        <button
          className={styles.applyButton}
          onClick={applyFilters}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Apply filters"}
        </button>

        {recipes.length > 0 && (
          <>
            <RecipesList recipes={recipes} />

            {hasMore && (
              <button
                className={styles.loadMore}
                onClick={loadMore}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load more"}
              </button>
            )}
          </>
        )}
      </section>
    </main>
  );
}
