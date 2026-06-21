"use client";

import { useState } from "react";
import styles from "./MobileFilters.module.css";

export default function MobileFilters({
  categories,
  ingredients,
  selectedCategories,
  selectedIngredients,
  onApply,
  onReset,
  onClose,
}) {
  const [localCats, setLocalCats] = useState(selectedCategories);
  const [localIngs, setLocalIngs] = useState(selectedIngredients);

  const toggleCat = (id: string) => {
    setLocalCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleIng = (id: string) => {
    setLocalIngs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h3>Filters</h3>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.block}>
          <h4>Categories</h4>
          {categories.map((cat) => (
            <label key={cat._id} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={localCats.includes(cat._id)}
                onChange={() => toggleCat(cat._id)}
              />
              {cat.name}
            </label>
          ))}
        </div>

        <div className={styles.block}>
          <h4>Ingredients</h4>
          {ingredients.map((ing) => (
            <label key={ing._id} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={localIngs.includes(ing._id)}
                onChange={() => toggleIng(ing._id)}
              />
              {ing.name}
            </label>
          ))}
        </div>

        <div className={styles.buttons}>
          <button className={styles.reset} onClick={onReset}>
            Reset
          </button>
          <button
            className={styles.apply}
            onClick={() => onApply(localCats, localIngs)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
