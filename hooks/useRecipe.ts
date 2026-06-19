import { useQuery } from "@tanstack/react-query";
import { nextServer } from "@/lib/api/api";

/* Отримати один рецепт за ID */
const fetchRecipeById = async (id: string) => {
const res = await nextServer.get(`/recipes/${id}`);
  return res.data;
};

/* Хук для RecipeDetails */
export const useRecipe = (id: string) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id),
    enabled: !!id, // запит виконується тільки якщо є ID
  });
};
