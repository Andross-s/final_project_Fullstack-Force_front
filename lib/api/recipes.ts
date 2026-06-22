import { nextServer } from '@/lib/api/api';

/* Отримати список рецептів з пагінацією */
export const getRecipesApi = async (page: number) => {
  const res = await nextServer.get(`/api/recipes?page=${page}`);
  return res.data;
};

/* CREATE recipe */
export const createRecipeApi = async (formData: FormData) => {
  const res = await nextServer.post('/api/recipes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

/* GET categories */
export const getCategoriesApi = async () => {
  const res = await nextServer.get('/api/categories');
  return res.data;
};

/* GET ingredients */
export const getIngredientsApi = async () => {
  const res = await nextServer.get('/api/ingredients');
  return res.data;
};