import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST() {
  try {
    const cookieStore = await cookies();

    const apiRes = await api.post(
      '/api/auth/refresh',
      {},
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path || '/',
          maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        };

        if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
        if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      const serverStatus = error.response?.status;
      const serverData = error.response?.data;

      logErrorResponse(serverData);
      return NextResponse.json(
        {
          error: error.message,
          response: serverData,
        },
        { status: serverStatus || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: (error as Error).message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
