export interface Ingredient {
  _id: string;
  name: string;
}

export interface SelectedIngredient {
  ingredientId: string;
  ingredientAmount: string;
}

export interface RecipeFormValues {
  name: string;
  descr: string;
  cookingTime: number | "";
  cals: number | "";
  category: string;
  ingredients: SelectedIngredient[];
  instruction: string;
  recipeImg: File | null;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  time: number;
  calories: number;
  image: string;
}
