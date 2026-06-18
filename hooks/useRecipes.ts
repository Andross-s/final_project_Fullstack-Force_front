import { useQuery } from "@tanstack/react-query";
import { nextServer } from "@/lib/api/api";

const fetchRecipeById = async (id: string) => {
    const res = await nextServer.get(`/recipes/${id}`);
    return res.data;
};

export const useRecipe = (id: string) => {
    return useQuery({
        queryKey: ["recipe", id],
        queryFn: () => fetchRecipeById(id),
        enabled: !!id,
    });
};
