import { nextServer } from './api';

/* Отримати список рецептів з пагінацією */
export const getRecipesApi = async (page: number, limit: number = 9) => {
  const res = await nextServer.get(`/api/recipes?page=${page}&limit=${limit}`);
  return res.data;
};
