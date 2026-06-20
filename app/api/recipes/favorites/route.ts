import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { isAxiosError } from 'axios';

// НОВИЙ proxy-route: список обраних рецептів поточного користувача (бекенд: /api/recipes/favorites)
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const apiRes = await api.get('/api/recipes/favorites', {
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
