import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { isAxiosError } from 'axios';

// proxy-route: власні рецепти поточного користувача (бекенд: GET /api/recipes/own)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cookieStore = await cookies();

    const page = searchParams.get('page');
    const perPage = searchParams.get('perPage');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // додаємо в params лише непорожні значення — бекенд-валідація (Joi)
    // не приймає category як порожній рядок
    const params: Record<string, string> = {};
    if (page) params.page = page;
    if (perPage) params.perPage = perPage;
    if (category) params.category = category;
    if (search) params.search = search;

    const apiRes = await api.get('/api/recipes/own', {
      params,
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