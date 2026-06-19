"use client";

import { useParams, useRouter } from "next/navigation";
import { useRecipe } from "@/hooks/useRecipe";
import { useEffect, useState } from "react";

import RecipeImage from "@/components/recipes/recipeDetails/RecipeImage/RecipeImage";
import RecipeTitle from "@/components/recipes/recipeDetails/RecipeTitle/RecipeTitle";
import GeneralInfo from "@/components/recipes/recipeDetails/GeneralInfo/GeneralInfo";
import RecipeSection from "@/components/recipes/recipeDetails/RecipeSection/RecipeSection";
import SaveButton from "@/components/recipes/recipeDetails/SaveButton/SaveButton";

import RecipeDetailsSkeleton from "@/components/recipes/recipeDetails/RecipeDetailsSkeleton";
import RecipesList from "@/components/recipes/RecipesList/RecipesList";

import styles from "./RecipeDetails.module.css";

type IngredientItem = {
  _id: string;
  name: string;
  amount: string;
};

export default function RecipeDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const recipeId = Array.isArray(id) ? id[0] : id;

  const { data, isLoading, isError } = useRecipe(recipeId ?? "");

  const [similar, setSimilar] = useState([]);

  // ============================================================
  // 📌 Загружаем похожие рецепты
  // ============================================================
  useEffect(() => {
    if (!data?.recipe?.category?._id) return;

    const fetchSimilar = async () => {
      try {
        const res = await fetch(
          `/api/recipes?category=${encodeURIComponent(
            data.recipe.category._id
          )}&perPage=4&page=1`
        );

        const json = await res.json();

        // исключаем текущий рецепт
        const filtered = (json.recipes || []).filter(
          (r: any) => r._id !== data.recipe._id
        );

        setSimilar(filtered);
      } catch (e) {
        console.error("Помилка завантаження схожих рецептів:", e);
      }
    };

    fetchSimilar();
  }, [data]);

  if (isLoading) return <RecipeDetailsSkeleton />;
  if (isError) return <p className={styles.error}>Помилка завантаження рецепта</p>;

  const recipe = data.recipe;

  return (
    <div className={styles.wrapper}>
      {/* 🔙 Кнопка назад */}
      <button className={styles.backButton} onClick={() => router.back()}>
        ← Назад
      </button>

      {/* 🖼 Фото рецепта */}
      <RecipeImage src={recipe.thumb} alt={recipe.title} />

      {/* 📝 Заголовок */}
      <RecipeTitle title={recipe.title} />

      {/* ⏱ Інформація про час та калорії */}
      <GeneralInfo time={recipe.time} calories={recipe.calories} />

      {/* ❤️ Кнопка "Зберегти" */}
      <SaveButton recipeId={recipe._id} />

      {/* 🧂 Інгредієнти */}
      <RecipeSection title="Ingredients">
        <ul className={styles.ingredientsList}>
          {recipe.ingredients.map((item: IngredientItem) => (
            <li key={item._id}>
              {item.name} — {item.amount}
            </li>
          ))}
        </ul>
      </RecipeSection>

      {/* 📖 Інструкція */}
      <RecipeSection title="Instructions">
        <p className={styles.instructions}>{recipe.instructions}</p>
      </RecipeSection>

      {/* 🍽 Схожі рецепти */}
      {similar.length > 0 && (
        <div className={styles.similarWrapper}>
          <h2 className={styles.sectionTitle}>Similar recipes</h2>

          <RecipesList recipes={similar} />
        </div>
      )}
    </div>
  );
}
