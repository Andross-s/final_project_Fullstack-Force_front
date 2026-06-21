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
  setFieldValue: (field: string, value: unknown) => void;
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
      ingredientAmount,
    };

    setFieldValue('ingredients', [...values.ingredients, newIngredient]);

    setSelectedIngredient('');
    setIngredientAmount('');
  };

  const removeIngredient = (ingredientId: string) => {
    setFieldValue(
      'ingredients',
      values.ingredients.filter((i) => i.ingredientId !== ingredientId)
    );
  };

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

  <button type="button" onClick={handleAdd} className={styles.addBtn}>
          Add ingredient
        </button>
      </div>

      <div className={styles.list}>
        {values.ingredients.map((i, idx) => (
          <div key={`${i.ingredientId}-${idx}`} className={styles.item}>
  <span>{i.ingredientAmount}</span>
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

      <ErrorMessage name="ingredients" component="p" className={styles.error} />
    </section>
  );
}