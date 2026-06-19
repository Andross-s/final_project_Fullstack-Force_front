"use client";

import { useState } from "react";
import { ErrorMessage } from "formik";
import styles from "./IngredientsBlock.module.css";

import type {
  Ingredient,
  RecipeFormValues,
  SelectedIngredient,
} from "@/types/recipe";

interface Props {
  ingredients: Ingredient[];
  values: RecipeFormValues;
  setFieldValue: (field: string, value: unknown) => void;
}

export default function IngredientsBlock({
  ingredients,
  values,
  setFieldValue,
}: Props) {
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");

  const handleAdd = () => {
    if (!selectedIngredient || !ingredientAmount) return;

    const exists = values.ingredients.some(
      (i) => i.ingredientId === selectedIngredient
    );

    if (exists) return;

    const ing = ingredients.find((i) => i._id === selectedIngredient);

    if (!ing) return;

    const newItem: SelectedIngredient = {
      ingredientId: ing._id,
      name: ing.name,
      ingredientAmount,
    };

    setFieldValue("ingredients", [...values.ingredients, newItem]);

    setSelectedIngredient("");
    setIngredientAmount("");
  };

  const remove = (id: string) => {
    setFieldValue(
      "ingredients",
      values.ingredients.filter((i) => i.ingredientId !== id)
    );
  };

  return (
    <div className={styles.wrapper}>
      <h2>Ingredients</h2>

      <select
        value={selectedIngredient}
        onChange={(e) => setSelectedIngredient(e.target.value)}
      >
        <option value="">Select</option>

        {ingredients.map((i) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>

      <input
        value={ingredientAmount}
        onChange={(e) => setIngredientAmount(e.target.value)}
        placeholder="Amount"
      />

      <button type="button" onClick={handleAdd}>
        Add
      </button>

      {values.ingredients.map((i, index) => (
        <div key={`${i.ingredientId}-${index}`}>
          <span>{i.name}</span>
          <span>{i.ingredientAmount}</span>

          <button type="button" onClick={() => remove(i.ingredientId)}>
            X
          </button>
        </div>
      ))}

      <ErrorMessage name="ingredients" component="p" />
    </div>
  );
}