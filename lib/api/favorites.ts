import { nextServer } from './api';

// ФІКС: раніше шляхи були `/favorites/${userId}` і `/favorites/${userId}/${recipeId}` —
// такого ресурсу на бекенді не існує. Реальний бекенд: `/api/recipes/favorites[/recipeId]`,
// користувач визначається по сесії (cookie), userId в URL не потрібен.

/* Отримати список обраних поточного користувача (визначається по сесії) */
export const getFavoritesApi = async () => {
  const res = await nextServer.get('/api/recipes/favorites');
  return res.data;
};

/* Додати рецепт до обраних */
export const addFavoriteApi = async (recipeId: string) => {
  const res = await nextServer.post(`/api/recipes/favorites/${recipeId}`);
  return res.data;
};

/* Видалити рецепт з обраних */
export const removeFavoriteApi = async (recipeId: string) => {
  const res = await nextServer.delete(`/api/recipes/favorites/${recipeId}`);
  return res.data;
};
