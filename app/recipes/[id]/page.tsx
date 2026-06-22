'use client';

import { useParams } from 'next/navigation';
import { useRecipe } from '@/hooks/useRecipe';

import RecipeImage from '@/components/recipes/recipeDetails/RecipeImage/RecipeImage';
import RecipeTitle from '@/components/recipes/recipeDetails/RecipeTitle/RecipeTitle';
import GeneralInfo from '@/components/recipes/recipeDetails/GeneralInfo/GeneralInfo';
import RecipeSection from '@/components/recipes/recipeDetails/RecipeSection/RecipeSection';
import SaveButton from '@/components/recipes/recipeDetails/SaveButton/SaveButton';
import NotFoundRecipe from '@/components/recipes/NotFoundRecipe/NotFoundRecipe';

import styles from './RecipeDetails.module.css';

type IngredientName = {
  _id: string;
  name: string;
};

type IngredientItem = {
  _id: string;
  ingredient: IngredientName;
  amount: string;
};

export default function RecipeDetailsPage() {
  const { id } = useParams();
  const recipeId = Array.isArray(id) ? id[0] : id;

  const { data, isError } = useRecipe(recipeId ?? '');
  if (isError) return <NotFoundRecipe />;

  return (
    <div className={styles.wrapper}>
      <RecipeTitle title={data.title} />

      <RecipeImage src={data.thumb} alt={data.title} />
      <div className={styles.layout}>
        <div className={styles.infoSave}>
          <GeneralInfo time={data.time} calories={data.calories} category={data.category.name} />
          <SaveButton recipeId={data._id} />
        </div>
        <div className={styles.recipeInfo}>
          <RecipeSection title="About recipe">
            <p>{data.description}</p>
          </RecipeSection>
          <RecipeSection title="Ingredients:">
            <ul className={styles.ingredientsList}>
              {data.ingredients.map((item: IngredientItem) => (
                <li key={item._id}>
                  {item.ingredient.name} — {item.amount}
                </li>
              ))}
            </ul>
          </RecipeSection>

          <RecipeSection title="Preparation Steps:">
            <p>{data.instructions}</p>
          </RecipeSection>
        </div>
      </div>
    </div>
  );
}
