'use client';

import { useState } from 'react';
import { ErrorMessage } from 'formik';
import toast from 'react-hot-toast';

import styles from './IngredientsBlock.module.css';

import type {
  Ingredient,
  RecipeFormValues,
  SelectedIngredient,
} from '@/types/recipe';

interface Props {
  ingredients: Ingredient[];
  values: RecipeFormValues;
  setFieldValue: (field: string, value: RecipeFormValues['ingredients']) => void;
}

export default function IngredientsBlock({
  ingredients,
  values,
  setFieldValue,
}: Props) {
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState('');

  const handleAdd = () => {
    if (!selectedIngredient || !ingredientAmount.trim()) {
      toast.error('Select ingredient and enter amount');
      return;
    }

    if (values.ingredients.length >= 16) {
      toast.error('Maximum 16 ingredients allowed');
      return;
    }

    const exists = values.ingredients.some(
      (i) => i.ingredientId === selectedIngredient
    );

    if (exists) {
      toast.error('Ingredient already added');
      return;
    }

    const ingredient = ingredients.find(
      (i) => i._id === selectedIngredient
    );

    if (!ingredient) return;

    const newIngredient: SelectedIngredient = {
      ingredientId: ingredient._id,
      ingredientAmount: ingredientAmount.trim(),
    };

    setFieldValue('ingredients', [
      ...values.ingredients,
      newIngredient,
    ]);

    setSelectedIngredient('');
    setIngredientAmount('');
  };

  const removeIngredient = (ingredientId: string) => {
    setFieldValue(
      'ingredients',
      values.ingredients.filter(
        (i) => i.ingredientId !== ingredientId
      )
    );
  };

  const isAddDisabled =
    !selectedIngredient || !ingredientAmount.trim();

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Ingredients</h2>

      <div className={styles.controls}>
        <select
          value={selectedIngredient}
          onChange={(e) => setSelectedIngredient(e.target.value)}
          className={styles.select}
        >
          <option value="">Select ingredient</option>

          {ingredients.map((i) => (
            <option key={i._id} value={i._id}>
              {i.name}
            </option>
          ))}
        </select>

        <input
          value={ingredientAmount}
          maxLength={10}
          onChange={(e) => setIngredientAmount(e.target.value)}
          placeholder="Amount"
          className={styles.input}
        />

        <button
          type="button"
          onClick={handleAdd}
          className={styles.addBtn}
          disabled={isAddDisabled}
        >
          Add ingredient
        </button>
      </div>

      <div className={styles.list}>
        {values.ingredients.map((i) => (
          <div key={i.ingredientId} className={styles.item}>
            <span className={styles.name}>
              {ingredients.find(
                (ing) => ing._id === i.ingredientId
              )?.name}
            </span>

            <span className={styles.amount}>
              {i.ingredientAmount}
            </span>

            <button
              type="button"
              onClick={() => removeIngredient(i.ingredientId)}
              className={styles.deleteBtn}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <ErrorMessage
        name="ingredients"
        component="p"
        className={styles.error}
      />
    </section>
  );
}