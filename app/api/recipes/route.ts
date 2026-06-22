import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  "https://final-project-fullstack-force-back-r48i.onrender.com/api/recipes";

// Коментар: фронт лише проксіює запит, логіка фільтрації на бекенді
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "12"; // макет вимагає 12

    const category = searchParams.get("category") || "";
    const ingredient = searchParams.get("ingredient") || "";
    const search = searchParams.get("search") || "";
    const maxTime = searchParams.get("maxTime") || "";
    const maxCalories = searchParams.get("maxCalories") || "";

    const backendUrl = new URL(BACKEND_URL);

    backendUrl.searchParams.set("page", page);
    backendUrl.searchParams.set("pageSize", pageSize);

    if (category) backendUrl.searchParams.set("category", category);
    if (ingredient) backendUrl.searchParams.set("ingredient", ingredient);
    if (search) backendUrl.searchParams.set("search", search);
    if (maxTime) backendUrl.searchParams.set("maxTime", maxTime);
    if (maxCalories) backendUrl.searchParams.set("maxCalories", maxCalories);

    const response = await fetch(backendUrl.toString(), {
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: String(err) },
      { status: 500 }
    );
  }
}
