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
  cookingTime: string;
  cals: string;
  category: string;
  instruction: string;
  ingredients: SelectedIngredient[];
  recipeImg: File | null;
}