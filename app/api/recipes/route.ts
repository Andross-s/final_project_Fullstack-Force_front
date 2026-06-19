import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  "https://final-project-fullstack-force-back-r48i.onrender.com/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";
  const ingredient = searchParams.get("ingredient") || "";

  const backendUrl = new URL(`${BACKEND_URL}/recipes`);

  if (query) {
    backendUrl.searchParams.set("search", query);
  }

  if (category) {
    backendUrl.searchParams.set("category", category);
  }

  if (ingredient) {
    backendUrl.searchParams.set("ingredient", ingredient);
  }

  const response = await fetch(backendUrl.toString(), {
    cache: "no-store",
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}