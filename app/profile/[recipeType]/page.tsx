'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ProfileNavigation } from '@/components/profile/ProfileNavigation/ProfileNavigation';
import Filters from '@/components/recipes/Filters/Filters';
import {
  RecipesList,
  type RecipeListItem,
} from '@/components/recipes/RecipesList/RecipesList';
import { LoadMoreBtn } from '@/components/recipes/LoadMoreBtn/LoadMoreBtn';
import { NoRecipesYet } from '@/components/shared/NoRecipesYet/NoRecipesYet';
import { getOwnRecipesApi } from '@/lib/api/recipes';
import { getFavoritesApi } from '@/lib/api/favorites';
import styles from './page.module.css';

const PAGE_SIZE = 12;

const getReferenceId = (
  value?: string | { _id: string }
) => (typeof value === 'string' ? value : value?._id);

const hasIngredient = (recipe: RecipeListItem, ingredientId: string) => {
  if (!ingredientId) return true;

  return recipe.ingredients?.some(
    item => getReferenceId(item.ingredient) === ingredientId
  ) ?? false;
};

export default function ProfilePage() {
  const { recipeType } = useParams<{ recipeType: string }>();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isOwnLoading,
    isError: isOwnError,
  } = useInfiniteQuery({
    queryKey: ['own-recipes', selectedCategory],
    queryFn: ({ pageParam }) =>
      getOwnRecipesApi({
        page: pageParam,
        perPage: PAGE_SIZE,
        category: selectedCategory || undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: recipeType === 'own',
  });

  const {
    data: favoritesData,
    isLoading: isFavoritesLoading,
    isError: isFavoritesError,
  } = useQuery<RecipeListItem[]>({
    queryKey: ['favorites'],
    queryFn: getFavoritesApi,
    enabled: recipeType === 'favorites',
  });

  const ownRecipes = useMemo(
    () => data?.pages.flatMap(page => page.recipes as RecipeListItem[]) ?? [],
    [data]
  );

  const filteredOwnRecipes = useMemo(
    () => ownRecipes.filter(recipe => hasIngredient(recipe, selectedIngredient)),
    [ownRecipes, selectedIngredient]
  );

  const filteredFavorites = useMemo(() => {
    const uniqueRecipes = (favoritesData ?? []).filter(
      (recipe, index, recipes) =>
        recipes.findIndex(item => item._id === recipe._id) === index
    );

    return uniqueRecipes.filter(recipe => {
      const matchesCategory =
        !selectedCategory ||
        getReferenceId(recipe.category) === selectedCategory;

      return matchesCategory && hasIngredient(recipe, selectedIngredient);
    });
  }, [favoritesData, selectedCategory, selectedIngredient]);

  const isOwnPage = recipeType === 'own';
  const recipesToShow = isOwnPage
    ? filteredOwnRecipes
    : filteredFavorites.slice(0, visibleCount);

  const totalCount = isOwnPage
    ? selectedIngredient
      ? filteredOwnRecipes.length
      : (data?.pages[0]?.totalRecipes ?? 0)
    : filteredFavorites.length;

  const isLoading = isOwnPage ? isOwnLoading : isFavoritesLoading;
  const isError = isOwnPage ? isOwnError : isFavoritesError;

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedIngredient('');
    setVisibleCount(PAGE_SIZE);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  const handleIngredientChange = (ingredient: string) => {
    setSelectedIngredient(ingredient);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.profileTitle}>My profile</h1>

      <ProfileNavigation />

      <Filters
        recipesCount={totalCount}
        selectedCategory={selectedCategory}
        selectedIngredient={selectedIngredient}
        ingredientValue="id"
        onCategoryChange={handleCategoryChange}
        onIngredientChange={handleIngredientChange}
        onResetFilters={handleResetFilters}
      />

      <div className={styles.profileRecipes}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Could not load recipes</p>}

        {!isLoading && !isError && recipesToShow.length === 0 && (
          <NoRecipesYet
            message={
              selectedCategory || selectedIngredient
                ? 'No recipes match the selected filters'
                : isOwnPage
                  ? "You haven't added any recipes yet"
                  : "You haven't saved any recipes yet"
            }
          />
        )}

        {!isLoading && !isError && recipesToShow.length > 0 && (
          <RecipesList recipes={recipesToShow} type={recipeType} />
        )}

        {isOwnPage
          ? hasNextPage && (
              <LoadMoreBtn
                onClick={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
              />
            )
          : visibleCount < filteredFavorites.length && (
              <LoadMoreBtn
                onClick={() => setVisibleCount(count => count + PAGE_SIZE)}
                isLoading={false}
              />
            )}
      </div>
    </main>
  );
}
