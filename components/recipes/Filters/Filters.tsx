"use client";

import { useState, useRef } from "react";
import styles from "./Filters.module.css";

type Category = {
  _id: string;
  name: string;
};

type Ingredient = {
  _id: string;
  name: string;
};

type FiltersProps = {
  categories: Category[];
  ingredients: Ingredient[];
  filters: {
    category: string;
    ingredient: string;
    maxTime: string;
    maxCalories: string;
  };
  onChange: (filters: {
    category: string;
    ingredient: string;
    maxTime: string;
    maxCalories: string;
  }) => void;
};

export default function Filters({ categories, ingredients, filters, onChange }: FiltersProps) {
  const [category, setCategory] = useState(filters.category || "");
  const [ingredient, setIngredient] = useState(filters.ingredient || "");
  const [maxTime, setMaxTime] = useState(filters.maxTime || "");
  const [maxCalories, setMaxCalories] = useState(filters.maxCalories || "");

  // таймер для debounce
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // оновлення фільтрів
  const handleChange = (
    field: "category" | "ingredient" | "maxTime" | "maxCalories",
    value: string
  ) => {
    if (field === "category") setCategory(value);
    if (field === "ingredient") setIngredient(value);
    if (field === "maxTime") setMaxTime(value);
    if (field === "maxCalories") setMaxCalories(value);

    const next = {
      category: field === "category" ? value : category,
      ingredient: field === "ingredient" ? value : ingredient,
      maxTime: field === "maxTime" ? value : maxTime,
      maxCalories: field === "maxCalories" ? value : maxCalories,
    };

    // debounce тільки для інгредієнтів
    if (field === "ingredient") {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        onChange(next);
      }, 350);
    } else {
      onChange(next);
    }
  };

  // скидання всіх фільтрів
  const handleReset = () => {
    setCategory("");
    setIngredient("");
    setMaxTime("");
    setMaxCalories("");

    onChange({
      category: "",
      ingredient: "",
      maxTime: "",
      maxCalories: "",
    });
  };

  return (
    <div className={styles.filters}>
      {/* категорія */}
      <select
        className={styles.input}
        value={category}
        onChange={(e) => handleChange("category", e.target.value)}
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* інгредієнт */}
      <select
        className={styles.input}
        value={ingredient}
        onChange={(e) => handleChange("ingredient", e.target.value)}
      >
        <option value="">All ingredients</option>
        {ingredients.map((i) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>

      {/* макс час */}
      <input
        className={styles.input}
        type="number"
        min={0}
        placeholder="Max time (min)"
        value={maxTime}
        onChange={(e) => handleChange("maxTime", e.target.value)}
      />

      {/* макс калорії */}
      <input
        className={styles.input}
        type="number"
        min={0}
        placeholder="Max calories"
        value={maxCalories}
        onChange={(e) => handleChange("maxCalories", e.target.value)}
      />

      {/* кнопка скидання */}
      <button className={styles.resetBtn} onClick={handleReset}>
        Reset filters
      </button>
    </div>
  );
}
