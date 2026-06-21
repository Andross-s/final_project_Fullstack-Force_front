export interface Ingredient {
  _id: string;
  name: string;
}

export interface SelectedIngredient {
  ingredientId: string;
  name: string;
  ingredientAmount: string;
}

export interface RecipeFormValues {
  name: string;
  descr: string;
  cookingTime: number | string;
  cals: number | string;
  category: string;
  ingredients: SelectedIngredient[];
  instruction: string;
  recipeImg: File | null;
}