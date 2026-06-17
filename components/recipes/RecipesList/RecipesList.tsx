import RecipeCard from "../RecipeCard/RecipeCard";
import RecipeCardSkeleton from "../RecipeCard/RecipeCardSkeleton";
import styles from "./RecipesList.module.css";
import { useRecipes } from "@/hooks/useRecipes";

export default function RecipesList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useRecipes();

  /* Скелетони під час завантаження */
  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  /* Помилка */
  if (isError) {
    return <p style={{ textAlign: "center", color: "red" }}>Помилка завантаження рецептів</p>;
  }

  /* Об’єднання сторінок */
  const recipes = data?.pages.flatMap((page) => page.recipes) || [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            title={recipe.title}
            description={recipe.description}
            time={`${recipe.time} min`}
            calories={recipe.calories}
            image={recipe.thumb}
          />
        ))}
      </div>

      {/* Кнопка Load More */}
      {hasNextPage && (
        <button
          className={styles.loadMore}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
