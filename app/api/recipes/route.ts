import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query") || "";

  const backendUrl = new URL(`${BACKEND_URL}/recipes`);

  if (query) {
    backendUrl.searchParams.set("query", query);
  }

  const response = await fetch(backendUrl.toString(), {
    cache: "no-store",
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}