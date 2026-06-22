'use client';

import { ProfileNavigation } from '@/components/profile/ProfileNavigation/ProfileNavigation';
import { RecipesList } from '@/components/recipes/RecipesList/RecipesList';
import { LoadMoreBtn } from '@/components/recipes/LoadMoreBtn/LoadMoreBtn';

import { useParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getOwnRecipesApi } from '@/lib/api/recipes';
import { NoRecipesYet } from '@/components/shared/NoRecipesYet/NoRecipesYet';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFavoritesApi } from '@/lib/api/favorites';

import styles from './page.module.css';

export default function ProfilePage() {
  const { recipeType } = useParams<{ recipeType: string }>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['own-recipes'],
      queryFn: ({ pageParam }) => getOwnRecipesApi({ page: pageParam, perPage: 12 }),
      initialPageParam: 1,
      getNextPageParam: lastPage =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
      enabled: recipeType === 'own',
    });

  const ownRecipes = useMemo(() => data?.pages.flatMap(p => p.recipes) ?? [], [data]);

  const [visibleCount, setVisibleCount] = useState(12);

  const { data: favData } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavoritesApi,
    enabled: recipeType === 'favorites',
  });

  const allFavorites = useMemo(() => {
    const list = favData ?? [];
    return list.filter(
      (recipe: { _id: string }, index: number, arr: { _id: string }[]) =>
        arr.findIndex(r => r._id === recipe._id) === index
    );
  }, [favData]);

  const recipesToShow = recipeType === 'own' ? ownRecipes : allFavorites.slice(0, visibleCount);

  const totalCount =
    recipeType === 'own' ? (data?.pages[0]?.totalRecipes ?? 0) : allFavorites.length;

  return (
    <main className={styles.container}>
      <h1 className={styles.profileTitle}>My profile</h1>

      <ProfileNavigation />

      <div className={styles.profileInfo}>
        <p className={styles.recipesCount}>{totalCount} recipes</p>
      </div>

      <div className={styles.profileRecipes}>
        {recipeType === 'own' && isLoading && <p>Завантаження...</p>}
        {recipeType === 'own' && isError && <p>Не вдалося завантажити рецепти</p>}

        {recipeType === 'own' && !isLoading && !isError && ownRecipes.length === 0 && (
          <NoRecipesYet message="You haven't added any recipes yet" />
        )}

        <RecipesList recipes={recipesToShow} type={recipeType} />

        {recipeType === 'own'
          ? hasNextPage && (
              <LoadMoreBtn onClick={() => fetchNextPage()} isLoading={isFetchingNextPage} />
            )
          : visibleCount < allFavorites.length && (
              <LoadMoreBtn onClick={() => setVisibleCount(prev => prev + 12)} isLoading={false} />
            )}
      </div>
    </main>
  );
}
