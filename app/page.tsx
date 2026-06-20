"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import SearchBox from "../components/recipes/SearchBox/SearchBox";
import Filters from "../components/recipes/Filters/Filters";
import RecipesList from "../components/recipes/RecipesList/RecipesList";

import styles from "./page.module.css";
import toast from "react-hot-toast";

// тип відповіді від API
type RecipesResponse = {
  recipes?: any[];
  data?: any[] | { recipes?: any[] };
  totalRecipes?: number;
  totalAll?: number;
  totalCount?: number;
};

// стан фільтрів
type FiltersState = {
  category: string;
  ingredient: string;
  maxTime: string;
  maxCalories: string;
};

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);

  const [filters, setFilters] = useState<FiltersState>({
    category: "",
    ingredient: "",
    maxTime: "",
    maxCalories: "",
  });

  // 1. Завантажуємо категорії
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data || []);
      } catch (err) {
        console.error("Categories fetch error:", err);
      }
    };
    loadCategories();
  }, []);

  // 2. Завантажуємо інгредієнти
  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const res = await fetch("/api/ingredients");
        const data = await res.json();
        setIngredients(data || []);
      } catch (err) {
        console.error("Ingredients fetch error:", err);
      }
    };
    loadIngredients();
  }, []);

  // 3. Читаємо фільтри з URL при завантаженні
  useEffect(() => {
    const category = searchParams.get("category") || "";
    const ingredient = searchParams.get("ingredient") || "";
    const maxTime = searchParams.get("maxTime") || "";
    const maxCalories = searchParams.get("maxCalories") || "";

    setFilters({
      category,
      ingredient,
      maxTime,
      maxCalories,
    });
  }, [searchParams]);

  // 4. Завантажуємо рецепти при зміні фільтрів
  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true);
      try {
        const query = new URLSearchParams();

        if (filters.category) query.set("category", filters.category);
        if (filters.ingredient) query.set("ingredient", filters.ingredient);
        if (filters.maxTime) query.set("maxTime", filters.maxTime);
        if (filters.maxCalories) query.set("maxCalories", filters.maxCalories);

        const res = await fetch(`/api/recipes?${query.toString()}`);
        const data: RecipesResponse = await res.json();

        const list =
          data.recipes ||
          data.data ||
          data.totalRecipes ||
          data.totalAll ||
          data.totalCount ||
          [];

        setRecipes(Array.isArray(list) ? list : list.recipes || []);
      } catch (err) {
        console.error("Recipes fetch error:", err);
        toast.error("Помилка завантаження рецептів");
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipes();
  }, [filters]);

  // 5. Оновлюємо URL при зміні фільтрів
  const updateFilters = (newFilters: Partial<FiltersState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);

    const params = new URLSearchParams();

    if (updated.category) params.set("category", updated.category);
    if (updated.ingredient) params.set("ingredient", updated.ingredient);
    if (updated.maxTime) params.set("maxTime", updated.maxTime);
    if (updated.maxCalories) params.set("maxCalories", updated.maxCalories);

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className={styles.page}>
      {/* поле пошуку */}
      <SearchBox />

      {/* фільтри */}
      <Filters
        categories={categories}
        ingredients={ingredients}
        filters={filters}
        onChange={updateFilters}
      />

      {/* список рецептів */}
      <RecipesList recipes={recipes} isLoading={isLoading} />
    </div>
  );
}
