import { nextServer } from "./api";

export const getCategoriesApi = async () => {
  const res = await nextServer.get("/api/categories");
  return res.data;
};

export const getIngredientsApi = async () => {
  const res = await nextServer.get("/api/ingredients");
  return res.data;
};