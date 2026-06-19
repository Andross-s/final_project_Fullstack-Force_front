"use client";

import { useEffect, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LoadMoreBtn } from "@/components/recipes/LoadMoreBtn/LoadMoreBtn";
import RecipesList, {
  RecipeListItem,
} from "@/components/recipes/RecipesList/RecipesList";
import SearchBox from "@/components/recipes/SearchBox/SearchBox";
import styles from "./page.module.css";

const PAGE_SIZE = 12;

type RecipesResponse = {
  recipes?: RecipeListItem[];
  data?: RecipeListItem[] | { recipes?: RecipeListItem[] };
  totalRecipes?: number;
  total?: number;
  totalCount?: number;
};

type NormalizedRecipesResponse = {
  recipes: RecipeListItem[];
  total: number;
};

const normalizeRecipesResponse = (
  data: RecipesResponse
): NormalizedRecipesResponse => {
  const recipes = Array.isArray(data.recipes)
    ? data.recipes
    : Array.isArray(data.data)
      ? data.data
      : data.data?.recipes || [];

  const total = data.totalRecipes ?? data.total ?? data.totalCount ?? recipes.length;

  return { recipes, total };
};

const fetchRecipes = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}) => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(PAGE_SIZE),
  });

  if (query) params.set("query", query);

  const response = await fetch(`/api/recipes?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return normalizeRecipesResponse(await response.json());
};

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["recipes", searchQuery],
    queryFn: ({ pageParam }) =>
      fetchRecipes({
        page: pageParam,
        query: searchQuery,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce(
        (sum, page) => sum + page.recipes.length,
        0
      );

      return loaded < lastPage.total ? allPages.length + 1 : undefined;
    },
  });

  const recipes = useMemo(
    () => data?.pages.flatMap((page) => page.recipes) || [],
    [data]
  );

  const totalRecipes = data?.pages[0]?.total ?? 0;

  useEffect(() => {
    if (!searchQuery || isLoading || isFetching || recipes.length > 0) return;

    toast.error(`No recipes found for "${searchQuery}"`);
  }, [isFetching, isLoading, recipes.length, searchQuery]);

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Recipes</h1>
            <p className={styles.count}>{totalRecipes} recipes</p>
          </div>

          <div className={styles.search}>
            <SearchBox onSearch={setSearchQuery} />
          </div>
        </div>

        {isError ? (
          <p className={styles.state}>Could not load recipes</p>
        ) : isLoading ? (
          <p className={styles.state}>Loading...</p>
        ) : recipes.length > 0 ? (
          <RecipesList recipes={recipes} />
        ) : (
          <p className={styles.state}>No recipes found</p>
        )}

        {hasNextPage && (
          <LoadMoreBtn
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage || (isFetching && !isLoading)}
          />
        )}
      </section>
    </main>
  );
}
