import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../api";
import { isAxiosError } from "axios";

type RecipesResponse = {
  recipes?: unknown[];
  data?: unknown[] | { recipes?: unknown[] };
  totalRecipes?: number;
  total?: number;
  totalCount?: number;
};

const getRecipes = (data: RecipesResponse) => {
  if (Array.isArray(data.recipes)) return data.recipes;
  if (Array.isArray(data.data)) return data.data;
  return data.data?.recipes || [];
};

const getTotal = (data: RecipesResponse) => {
  return data.totalRecipes ?? data.total ?? data.totalCount ?? 0;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page");
    const perPage = searchParams.get("pageSize") || searchParams.get("perPage");
    const search = searchParams.get("query") || searchParams.get("search");
    const category = searchParams.get("category");
    const ingredient = searchParams.get("ingredient");

    const params: Record<string, string> = {};
    if (page) params.page = page;
    if (perPage) params.perPage = perPage;
    if (search) params.search = search;
    if (category) params.category = category;
    if (ingredient) params.ingredient = ingredient;

    const apiRes = await api.get("/api/recipes", { params });
    const data = apiRes.data as RecipesResponse;

    return NextResponse.json({
      recipes: getRecipes(data),
      totalRecipes: getTotal(data),
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 400 }
      );
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

const BACKEND_URL =
  "https://final-project-fullstack-force-back-r48i.onrender.com/api";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const cookieStore = await cookies();

    const response = await fetch(BACKEND_URL + "/recipes", {
      method: "POST",
      body: formData,
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("POST /api/recipes error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
