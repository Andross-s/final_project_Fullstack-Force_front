'use client';

import { ProfileNavigation } from '@/components/profile/ProfileNavigation/ProfileNavigation';
import RecipesList from '@/components/recipes/RecipesList/RecipesList';
import { LoadMoreBtn } from '@/components/recipes/LoadMoreBtn/LoadMoreBtn';

import { useParams } from 'next/navigation';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { getOwnRecipesApi } from '@/lib/api/recipes';
import { getFavoritesApi } from '@/lib/api/favorites';

<<<<<<< HEAD
import { NoRecipesYet } from '@/components/shared/NoRecipesYet/NoRecipesYet';

=======
>>>>>>> 4a56f07d3a3cffbb4f488624f0be91020a66a7cb
import styles from './page.module.css';

export default function ProfilePage() {
  const { recipeType } = useParams<{ recipeType: string }>();

<<<<<<< HEAD
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['own-recipes'],
    queryFn: ({ pageParam }) =>
      getOwnRecipesApi({ page: pageParam, perPage: 12 }),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: recipeType === 'own',
  });

  const ownRecipes = useMemo(
    () => data?.pages.flatMap(p => p.recipes) ?? [],
    [data]
  );
=======
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
>>>>>>> 4a56f07d3a3cffbb4f488624f0be91020a66a7cb

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

<<<<<<< HEAD
  const recipesToShow =
    recipeType === 'own'
      ? ownRecipes
      : allFavorites.slice(0, visibleCount);

  const totalCount =
    recipeType === 'own'
      ? data?.pages[0]?.totalRecipes ?? 0
      : allFavorites.length;
=======
  const recipesToShow = recipeType === 'own' ? ownRecipes : allFavorites.slice(0, visibleCount);

  const totalCount =
    recipeType === 'own' ? (data?.pages[0]?.totalRecipes ?? 0) : allFavorites.length;
>>>>>>> 4a56f07d3a3cffbb4f488624f0be91020a66a7cb

  return (
    <main className={styles.container}>
      <h1 className={styles.profileTitle}>My profile</h1>

      <ProfileNavigation />

      <div className={styles.profileInfo}>
        <p className={styles.recipesCount}>{totalCount} recipes</p>
      </div>

      <div className={styles.profileRecipes}>
        {recipeType === 'own' && isLoading && <p>Завантаження...</p>}
        {recipeType === 'own' && isError && (
          <p>Не вдалося завантажити рецепти</p>
        )}

<<<<<<< HEAD
        {recipeType === 'own' &&
          !isLoading &&
          !isError &&
          ownRecipes.length === 0 && (
            <NoRecipesYet message="You haven't added any recipes yet" />
          )}
=======
        {recipeType === 'own' && !isLoading && !isError && ownRecipes.length === 0 && (
          <NoRecipesYet message="You haven't added any recipes yet" />
        )}
>>>>>>> 4a56f07d3a3cffbb4f488624f0be91020a66a7cb

        {/* LIST */}
        <RecipesList recipes={recipesToShow} />

<<<<<<< HEAD
        {/* LOAD MORE */}
        {recipeType === 'own' ? (
          hasNextPage && (
            <LoadMoreBtn
              onClick={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
            />
          )
        ) : (
          visibleCount < allFavorites.length && (
            <LoadMoreBtn
              onClick={() => setVisibleCount(prev => prev + 12)}
              isLoading={false}
            />
          )
        )}
=======
        {recipeType === 'own'
          ? hasNextPage && (
              <LoadMoreBtn onClick={() => fetchNextPage()} isLoading={isFetchingNextPage} />
            )
          : visibleCount < allFavorites.length && (
              <LoadMoreBtn onClick={() => setVisibleCount(prev => prev + 12)} isLoading={false} />
            )}
>>>>>>> 4a56f07d3a3cffbb4f488624f0be91020a66a7cb
      </div>
    </main>
  );
}
