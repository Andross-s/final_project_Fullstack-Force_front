import { NextResponse } from "next/server";

const BACKEND_URL =
  "https://final-project-fullstack-force-back-r48i.onrender.com/api";

export async function GET() {
  const response = await fetch(`${BACKEND_URL}/ingredients`, {
    cache: "no-store",
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}