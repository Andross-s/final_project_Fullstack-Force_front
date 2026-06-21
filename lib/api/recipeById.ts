import { nextServer } from "./api";

/* Отримати рецепт за ID */
export const getRecipeByIdApi = async (id: string) => {
  const res = await nextServer.get(`/api/recipes/${id}`);
  return res.data;
};



