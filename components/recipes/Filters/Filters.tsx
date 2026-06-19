"use client";

import { useState } from "react";
import styles from "./Filters.module.css";
import { useCategories, useIngredients } from "@/hooks/useFilters";
import FilterIcon from "@/components/icon/filter.svg";
import CloseIcon from "@/components/icon/close.svg";

type FiltersProps = {
  recipesCount: number;
  selectedCategory: string;
  selectedIngredient: string;
  onCategoryChange: (value: string) => void;
  onIngredientChange: (value: string) => void;
  onResetFilters: () => void;
};

export default function Filters({
  recipesCount,
  selectedCategory,
  selectedIngredient,
  onCategoryChange,
  onIngredientChange,
  onResetFilters,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  const { data: ingredients = [], isLoading: ingredientsLoading } =
    useIngredients();

  return (
    <div className={styles.wrapper}>
      <p className={styles.count}>{recipesCount} recipes</p>

      <button
        className={styles.mobileButton}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Filters
        <FilterIcon
          className={`${styles.icon} ${styles.filterIcon}`}
        />
      </button>

      <div className={`${styles.controls} ${isOpen ? styles.open : ""}`}>
        <div className={styles.mobileHeader}>
          <span>Filters</span>

          <button
            className={styles.closeButton}
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon
              className={`${styles.icon} ${styles.closeIcon}`}
            />
          </button>
        </div>

        <button
          className={styles.resetButton}
          type="button"
          onClick={onResetFilters}
        >
          Reset filters
        </button>

        <select
          className={styles.input}
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          disabled={categoriesLoading}
        >
          <option value="">Category</option>

          {categories.map((category: { _id: string; name: string }) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          className={styles.input}
          value={selectedIngredient}
          onChange={(event) => onIngredientChange(event.target.value)}
          disabled={ingredientsLoading}
        >
          <option value="">Ingredient</option>

          {ingredients.map((ingredient: { _id: string; name: string }) => (
            <option key={ingredient._id} value={ingredient._id}>
              {ingredient.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}