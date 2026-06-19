"use client";

import { useState, useRef } from "react";
import styles from "./Filters.module.css";

type Category = {
  _id: string;
  name: string;
};

type FiltersProps = {
  categories: Category[];
  onChange: (filters: {
    category: string;
    ingredient: string;
    maxTime: string;
    maxCalories: string;
  }) => void;
};

export default function Filters({ categories, onChange }: FiltersProps) {
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [maxCalories, setMaxCalories] = useState("");

  // ⏳ Таймер для debounce
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // 🔄 Оновлення фільтрів
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

    // 🧠 Debounce тільки для текстових полів
    if (field === "ingredient") {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        onChange(next);
      }, 350);
    } else {
      // ⏱ Інші поля — без debounce
      onChange(next);
    }
  };

  // 🔁 Скидання всіх фільтрів
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
      {/* 🏷 Категорія (select) */}
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

      {/* 🔁 Кнопка скидання */}
      <button className={styles.resetBtn} onClick={handleReset}>
        Reset filters
      </button>
    </div>
  );
}
