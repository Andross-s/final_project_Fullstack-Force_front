import type { RecipeFormValues } from "@/types/recipe";

export const prepareFormData = (values: RecipeFormValues) => {
  const formData = new FormData();

  formData.append("title", values.name);
  formData.append("description", values.descr);
  
 
  formData.append("cookingTime", String(values.cookingTime));
  formData.append("calories", String(values.cals));
  
  formData.append("category", values.category);
  formData.append("instructions", values.instruction);

  if (values.recipeImg) {
    formData.append("recipeImg", values.recipeImg);
  }

  formData.append(
    "ingredients",
    JSON.stringify(values.ingredients)
  );

  return formData;
};