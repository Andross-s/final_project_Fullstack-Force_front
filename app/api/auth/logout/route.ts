import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

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

    const setCookie = apiRes.headers['set-cookie'];
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const [nameValue] = cookieStr.split(';');
        const separatorIndex = nameValue.indexOf('=');
        const name = nameValue.slice(0, separatorIndex).trim();
        const value = decodeURIComponent(nameValue.slice(separatorIndex + 1).trim());

        const parsed = parse(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        };

        cookieStore.set(name, value, options);
      }
    }

    if (apiRes.status === 204 || apiRes.status === 200) {
      return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
    }

    return NextResponse.json(apiRes.data || { message: 'Logged out' }, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      const cookieStore = await cookies();
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      cookieStore.delete('sessionId');

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
