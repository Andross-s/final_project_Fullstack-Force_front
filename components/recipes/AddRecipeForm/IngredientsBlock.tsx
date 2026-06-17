"use client";

import { useState } from "react";
import { ErrorMessage } from "formik";
import styles from "./IngredientsBlock.module.css";

import {
  Ingredient,
  RecipeFormValues,
  SelectedIngredient,
} from "./types";

interface IngredientsBlockProps {
  ingredients: Ingredient[];
  values: RecipeFormValues;
  setFieldValue: (
    field: string,
    value: unknown
  ) => void;
}

export default function IngredientsBlock({
  ingredients,
  values,
  setFieldValue,
}: IngredientsBlockProps) {
  const [
    selectedIngredient,
    setSelectedIngredient,
  ] = useState("");

  const [
    ingredientAmount,
    setIngredientAmount,
  ] = useState("");

  const handleAddIngredient =
    () => {
      if (!selectedIngredient)
        return;

      if (
        ingredientAmount.length <
          2 ||
        ingredientAmount.length >
          16
      ) {
        return;
      }

      const alreadyExists =
        values.ingredients.some(
          (ingredient) =>
            ingredient.ingredientId ===
            selectedIngredient
        );

      if (alreadyExists)
        return;

      const ingredientData =
        ingredients.find(
          (item) =>
            item._id ===
            selectedIngredient
        );

      if (!ingredientData)
        return;

      const newIngredient: SelectedIngredient =
        {
          ingredientId:
            ingredientData._id,
          name:
            ingredientData.name,
          ingredientAmount,
        };

      setFieldValue(
        "ingredients",
        [
          ...values.ingredients,
          newIngredient,
        ]
      );

      setSelectedIngredient("");
      setIngredientAmount("");
    };

  const handleRemoveIngredient =
    (
      ingredientId: string
    ) => {
      const filteredIngredients =
        values.ingredients.filter(
          (ingredient) =>
            ingredient.ingredientId !==
            ingredientId
        );

      setFieldValue(
        "ingredients",
        filteredIngredients
      );
    };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Ingredients
      </h2>

      <div
        className={styles.controls}
      >
        <select
          value={
            selectedIngredient
          }
          onChange={(e) =>
            setSelectedIngredient(
              e.target.value
            )
          }
          className={
            styles.select
          }
        >
          <option value="">
            Select ingredient
          </option>

          {ingredients.map(
            (
              ingredient
            ) => (
              <option
                key={
                  ingredient._id
                }
                value={
                  ingredient._id
                }
              >
                {
                  ingredient.name
                }
              </option>
            )
          )}
        </select>

        <input
          type="text"
          placeholder="Amount"
          value={
            ingredientAmount
          }
          onChange={(e) =>
            setIngredientAmount(
              e.target.value
            )
          }
          className={
            styles.input
          }
        />

        <button
          type="button"
          onClick={
            handleAddIngredient
          }
          className={
            styles.addButton
          }
        >
          Add ingredient
        </button>
      </div>

      <ErrorMessage
        name="ingredients"
        component="p"
        className={
          styles.error
        }
      />

      <ul className={styles.list}>
        {values.ingredients.map(
          (ingredient) => (
            <li
              key={
                ingredient.ingredientId
              }
              className={
                styles.item
              }
            >
              <span>
                {
                  ingredient.name
  }
              </span>
              <span>
                {ingredient.ingredientAmount}
              </span>

<button
   type="button"
 onClick={() =>
 handleRemoveIngredient(
  ingredient.ingredientId
 )
 }
className={
 styles.removeButton
 }
 >
   ✕
 </button>
 </li>
          )
 )}
 </ul>
    </div>
  );
}