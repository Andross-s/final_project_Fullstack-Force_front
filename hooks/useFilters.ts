import { useQuery } from "@tanstack/react-query";
import {
  getCategoriesApi,
  getIngredientsApi,
} from "@/lib/api/filters";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesApi,
  });
};

export const useIngredients = () => {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: getIngredientsApi,
  });
};