'use client';

import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { LoadMoreBtn } from '@/components/recipes/LoadMoreBtn/LoadMoreBtn';
import RecipesList, { RecipeListItem } from '@/components/recipes/RecipesList/RecipesList';
import SearchBox from '@/components/recipes/SearchBox/SearchBox';
import Filters from '@/components/recipes/Filters/Filters';
import styles from './RecipesSection.module.css';

const PAGE_SIZE = 12;

export type FetchRecipesParams = {
  page: number;
  pageSize: number;
  query?: string;
  category?: string;
  ingredient?: string;
};

export type FetchRecipesResult = {
  recipes: RecipeListItem[];
  total: number;
};

type RecipesSectionProps = {
  title: string;
  fetchRecipes: (params: FetchRecipesParams) => Promise<FetchRecipesResult>;
  listType?: string;
};

export default function RecipesSection({
  title,
  fetchRecipes,
  listType,
}: RecipesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['recipes', title, searchQuery, selectedCategory, selectedIngredient],
    queryFn: ({ pageParam }) =>
      fetchRecipes({
        page: pageParam,
        pageSize: PAGE_SIZE,
        query: searchQuery,
        category: selectedCategory,
        ingredient: selectedIngredient,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce(
        (sum, page) => sum + page.recipes.length,
        0,
      );

      return loaded < lastPage.total
        ? allPages.length + 1
        : undefined;
    },
  });

  const recipes = useMemo(
    () => data?.pages.flatMap(page => page.recipes) || [],
    [data],
  );

  const totalRecipes = data?.pages[0]?.total ?? 0;

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedIngredient('');
  };

  useEffect(() => {
    if (!searchQuery || isLoading || isFetching || recipes.length > 0) return;

    toast.error(`No recipes found for "${searchQuery}"`);
  }, [isFetching, isLoading, recipes.length, searchQuery]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Plan, Cook, and
            <br />
            Share Your Flavors
          </h1>

          <div className={styles.search}>
            <SearchBox onSearch={setSearchQuery} />
          </div>
        </div>
      </section>

      <section className={styles.container}>
        <div className={styles.resultsHeader}>
          <h2 className={styles.title}>
            {searchQuery
              ? `Search Results for “${searchQuery}”`
              : title}
          </h2>
        </div>

        <div className={styles.filtersRow}>

          <div className={styles.filtersBox}>
            <Filters
              recipesCount={totalRecipes}
              selectedCategory={selectedCategory}
              selectedIngredient={selectedIngredient}
              onCategoryChange={setSelectedCategory}
              onIngredientChange={setSelectedIngredient}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>

        {isError ? (
          <p className={styles.state}>Could not load recipes</p>
        ) : isLoading ? (
          <p className={styles.state}>Loading...</p>
        ) : recipes.length > 0 ? (
          <RecipesList recipes={recipes} type={listType} />
        ) : (
          <p className={styles.state}>No recipes found</p>
        )}

        {hasNextPage && (
          <LoadMoreBtn
            onClick={() => fetchNextPage()}
            isLoading={
              isFetchingNextPage || (isFetching && !isLoading)
            }
          />
        )}
      </section>
    </main>
  );
}