import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { isAxiosError } from 'axios';

type RouteContext = {
  params: Promise<{
    userId: string;
  }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { userId } = await context.params;
    const cookieStore = await cookies();

    const apiRes = await api.get(`/user/${userId}`, {
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
