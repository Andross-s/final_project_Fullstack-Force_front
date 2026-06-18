import { nextServer } from './api';

export const addRecipeToFavorites = async (recipeId: string) => {
  const response = await nextServer.post(`/recipes/favorites/${recipeId}`);

  return response.data;
};

export const removeRecipeFromFavorites = async (recipeId: string) => {
  const response = await nextServer.delete(`/recipes/favorites/${recipeId}`);

  return response.data;
};
