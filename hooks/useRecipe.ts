import { useQuery } from '@tanstack/react-query';
import { nextServer } from '@/lib/api/api';

/* Отримати один рецепт за ID */
// ФІКС: був шлях `/recipes/${id}` без `/api/` — це збігалося з самою сторінкою Next.js
// (повертало HTML замість JSON), тому сторінка деталей рецепта не відмальовувалась.
const fetchRecipeById = async (id: string) => {
  const res = await nextServer.get(`/api/recipes/${id}`);
  return res.data;
};

/* Хук для RecipeDetails */
export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id),
    enabled: !!id, // запит виконується тільки якщо є ID
  });
};
