import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  "https://final-project-fullstack-force-back-r48i.onrender.com/api";

const BACKEND_PAGE_SIZE = 10;

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

const getTotal = (data: RecipesResponse, fallback: number) => {
  return data.totalRecipes ?? data.total ?? data.totalCount ?? fallback;
};

const createBackendUrl = (searchParams: URLSearchParams, page: number) => {
  const backendUrl = new URL(`${BACKEND_URL}/recipes`);
  const query = searchParams.get("query") || searchParams.get("search") || "";

  if (query) {
    backendUrl.searchParams.set("search", query);
  }

  ["category", "ingredient"].forEach((key) => {
    const value = searchParams.get(key);

    if (value) {
      backendUrl.searchParams.set(key, value);
    }
  });

  backendUrl.searchParams.set("page", String(page));

  return backendUrl;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || BACKEND_PAGE_SIZE);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const firstBackendPage = Math.floor(startIndex / BACKEND_PAGE_SIZE) + 1;
  const lastBackendPage = Math.floor((endIndex - 1) / BACKEND_PAGE_SIZE) + 1;

  const backendPages = await Promise.all(
    Array.from(
      { length: lastBackendPage - firstBackendPage + 1 },
      (_, index) => firstBackendPage + index
    ).map(async (backendPage) => {
      const response = await fetch(
        createBackendUrl(searchParams, backendPage).toString(),
        { cache: "no-store" }
      );

      const data = await response.json();

      return { response, data };
    })
  );

  const failedPage = backendPages.find(({ response }) => !response.ok);

  if (failedPage) {
    return NextResponse.json(failedPage.data, {
      status: failedPage.response.status,
    });
  }

  const recipes = backendPages.flatMap(({ data }) =>
    getRecipes(data as RecipesResponse)
  );

  const offset = startIndex - (firstBackendPage - 1) * BACKEND_PAGE_SIZE;
  const pagedRecipes = recipes.slice(offset, offset + pageSize);

  const totalRecipes = getTotal(
    backendPages[0].data as RecipesResponse,
    recipes.length
  );

  return NextResponse.json({
    recipes: pagedRecipes,
    totalRecipes,
  });
}