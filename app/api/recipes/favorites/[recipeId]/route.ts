import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../../api';
import { isAxiosError } from 'axios';

type RouteContext = {
  params: Promise<{
    recipeId: string;
  }>;
};

// НОВИЙ proxy-route: додати рецепт в обрані (замінює хибний /favorites/:userId/:recipeId)
export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const { recipeId } = await context.params;
    const cookieStore = await cookies();

    const apiRes = await api.post(
      `/api/recipes/favorites/${recipeId}`,
      {},
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    return NextResponse.json(apiRes.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 400 }
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// НОВИЙ proxy-route: видалити рецепт з обраних
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const { recipeId } = await context.params;
    const cookieStore = await cookies();

    const apiRes = await api.delete(`/api/recipes/favorites/${recipeId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(apiRes.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 400 }
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
