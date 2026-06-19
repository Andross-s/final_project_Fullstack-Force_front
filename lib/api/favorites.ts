import { nextServer } from './api';

/* Отримати список обраних */
export const getFavoritesApi = async (userId: string) => {
  const res = await nextServer.get(`/favorites/${userId}`);
  return res.data;
};

/* Додати рецепт до обраних */
export const addFavoriteApi = async (recipeId: string, userId: string) => {
  const res = await nextServer.post(`/favorites/${userId}/${recipeId}`);
  return res.data;
};

/* Видалити рецепт з обраних */
export const removeFavoriteApi = async (recipeId: string, userId: string) => {
  const res = await nextServer.delete(`/favorites/${userId}/${recipeId}`);
  return res.data;
};
