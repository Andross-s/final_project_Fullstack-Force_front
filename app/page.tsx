"use client";

import RecipesSection, {
  FetchRecipesParams,
  FetchRecipesResult,
} from "@/components/recipes/RecipesSection/RecipesSection";
import { RecipeListItem } from "@/components/recipes/RecipesList/RecipesList";

type RecipesResponse = {
  recipes?: RecipeListItem[];
  data?: RecipeListItem[] | { recipes?: RecipeListItem[] };
  totalRecipes?: number;
  total?: number;
  totalCount?: number;
};

const normalizeRecipesResponse = (data: RecipesResponse): FetchRecipesResult => {
  const recipes = Array.isArray(data.recipes)
    ? data.recipes
    : Array.isArray(data.data)
      ? data.data
      : data.data?.recipes || [];

  const total =
    data.totalRecipes ?? data.total ?? data.totalCount ?? recipes.length;

  return { recipes, total };
};

const fetchHomeRecipes = async ({
  page,
  pageSize,
  query,
  category,
  ingredient,
}: FetchRecipesParams) => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (query) params.set("query", query);
  if (category) params.set("category", category);
  if (ingredient) params.set("ingredient", ingredient);

  const response = await fetch(`/api/recipes?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return normalizeRecipesResponse(await response.json());
};

export default function MainPage() {
  return <RecipesSection title="Recipes" fetchRecipes={fetchHomeRecipes} />;
}