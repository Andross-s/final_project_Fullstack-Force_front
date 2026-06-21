"use client";

import { useState } from "react";
import styles from "./Filters.module.css";
import useIsMobileOrTablet from "./useIsMobileOrTablet";
import MobileFilters from "./MobileFilters";

export default function Filters({
  categories,
  ingredients,
  selectedCategories,
  selectedIngredients,
  onCategoriesChange,
  onIngredientsChange,
  onReset,
}) {
  const isMobile = useIsMobileOrTablet();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Захист від undefined під час SSR
  if (!categories || !Array.isArray(categories)) return null;
  if (!ingredients || !Array.isArray(ingredients)) return null;

  // Десктопна версія
  if (!isMobile) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.controls}>

          {/* Фільтр категорій */}
          <div className={styles.dropdownWrapper}>
            <button className={styles.dropdownButton}>Categories</button>

            <div className={styles.dropdownMenu}>
              {categories.map((cat) => (
                <label key={cat._id} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat._id)}
                    onChange={() => {
                      if (selectedCategories.includes(cat._id)) {
                        onCategoriesChange(
                          selectedCategories.filter((c) => c !== cat._id)
                        );
                      } else {
                        onCategoriesChange([...selectedCategories, cat._id]);
                      }
                    }}
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </div>

          {/* Фільтр інгредієнтів */}
          <div className={styles.dropdownWrapper}>
            <button className={styles.dropdownButton}>Ingredients</button>

            <div className={styles.dropdownMenu}>
              {ingredients.map((ing) => (
                <label key={ing._id} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={selectedIngredients.includes(ing._id)}
                    onChange={() => {
                      if (selectedIngredients.includes(ing._id)) {
                        onIngredientsChange(
                          selectedIngredients.filter((i) => i !== ing._id)
                        );
                      } else {
                        onIngredientsChange([...selectedIngredients, ing._id]);
                      }
                    }}
                  />
                  {ing.name}
                </label>
              ))}
            </div>
          </div>

          <button className={styles.resetButton} onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    );
  }

  // Мобільна версія
  return (
    <>
      <button
        className={styles.mobileBtn}
        onClick={() => setShowMobileFilters(true)}
      >
        Filters
      </button>

      {showMobileFilters && (
        <MobileFilters
          categories={categories}
          ingredients={ingredients}
          selectedCategories={selectedCategories}
          selectedIngredients={selectedIngredients}
          onApply={(cats, ings) => {
            onCategoriesChange(cats);
            onIngredientsChange(ings);
            setShowMobileFilters(false);
          }}
          onReset={onReset}
          onClose={() => setShowMobileFilters(false)}
        />
      )}
    </>
  );
}
