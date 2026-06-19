import { nextServer } from './api';

/* Отримати список рецептів з пагінацією */
export const getRecipesApi = async (page: number) => {
  const res = await nextServer.get(`/api/recipes?page=${page}`);
  return res.data;
};
