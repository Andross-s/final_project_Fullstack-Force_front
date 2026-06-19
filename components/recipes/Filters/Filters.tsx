"use client";

import { useState } from "react";
import styles from "./Filters.module.css";

type FiltersProps = {
  onChange: (filters: {
    category: string;
    ingredient: string;
    maxTime: string;
    maxCalories: string;
  }) => void;
};

export default function Filters({ onChange }: FiltersProps) {
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [maxCalories, setMaxCalories] = useState("");

  // 🔄 Оновлюємо фільтри при зміні будь-якого поля
  const handleChange = (
    field: "category" | "ingredient" | "maxTime" | "maxCalories",
    value: string,
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

    onChange(next);
  };

  return (
    <div className={styles.filters}>
      {/* 🏷 Категорія */}
      <input
        className={styles.input}
        type="text"
        placeholder="Category ID or name"
        value={category}
        onChange={(e) => handleChange("category", e.target.value)}
      />

      {/* 🧂 Інгредієнт */}
      <input
        className={styles.input}
        type="text"
        placeholder="Ingredient name"
        value={ingredient}
        onChange={(e) => handleChange("ingredient", e.target.value)}
      />

      {/* ⏱ Макс. час */}
      <input
        className={styles.input}
        type="number"
        min={0}
        placeholder="Max time (min)"
        value={maxTime}
        onChange={(e) => handleChange("maxTime", e.target.value)}
      />

      {/* 🔥 Макс. калорії */}
      <input
        className={styles.input}
        type="number"
        min={0}
        placeholder="Max calories"
        value={maxCalories}
        onChange={(e) => handleChange("maxCalories", e.target.value)}
      />
    </div>
  );
}
