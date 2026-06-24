import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { forwardSetCookies, logErrorResponse } from '../../_utils/utils';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = req.headers.get('cookie') || '';

    const apiRes = await api.post(
      '/api/auth/logout',
      {},
      {
        headers: {
          Cookie: cookieHeader,
        },
      }
    );

    forwardSetCookies(apiRes.headers['set-cookie'], cookieStore);

    if (apiRes.status === 204 || apiRes.status === 200) {
      return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
    }

    return NextResponse.json(apiRes.data || { message: 'Logged out' }, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      const cookieStore = await cookies();
      cookieStore.delete({ name: 'accessToken', path: '/' });
      cookieStore.delete({ name: 'refreshToken', path: '/' });
      cookieStore.delete({ name: 'sessionId', path: '/' });

      return NextResponse.json({ message: 'Logged out (session already ended)' }, { status: 200 });
    }

    if (isAxiosError(error)) {
      const serverData = error.response?.data;
      logErrorResponse(serverData);
      return NextResponse.json(
        { error: error.message, response: serverData },
        { status: error.response?.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
