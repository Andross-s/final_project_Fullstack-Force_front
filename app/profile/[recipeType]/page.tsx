'use client';

import { useParams } from 'next/navigation';
import { ProfileNavigation } from '@/components/profile/ProfileNavigation/ProfileNavigation';
import RecipesList from '@/components/recipes/RecipesList/RecipesList';
import { LoadMoreBtn } from '@/components/recipes/LoadMoreBtn/LoadMoreBtn';

import styles from './page.module.css';

// Коментар: сторінка профілю для конкретного типу рецептів
export default function ProfilePage() {
  const params = useParams();
  const recipeType = Array.isArray(params.recipeType)
    ? params.recipeType[0]
    : params.recipeType;

  return (
    <main className={styles.container}>
      <h1 className={styles.profileTitle}>My profile</h1>

      <ProfileNavigation />

      {/* Коментар: список рецептів для вибраного типу */}
      <div className={styles.profileRecipes}>
        <RecipesList type={recipeType} />

        {/* Коментар: кнопка для завантаження додаткових рецептів */}
        <LoadMoreBtn recipeType={recipeType} />
      </div>
    </main>
  );
}
