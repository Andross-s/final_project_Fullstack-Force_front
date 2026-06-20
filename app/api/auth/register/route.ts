import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

// Реєстрація: проксує запит на бекенд і прокидає його cookies у браузер
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post('/api/auth/register', body);

    const cookieStore = await cookies();
    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      // ФІКС: те саме, що й у login/refresh — прокидаємо ВСІ cookie (включно з sessionId),
      // а не лише accessToken/refreshToken.
      for (const cookieStr of cookieArray) {
        const [nameValue] = cookieStr.split(';');
        const separatorIndex = nameValue.indexOf('=');
        const name = nameValue.slice(0, separatorIndex).trim();
        // ФІКС: decode значення, щоб уникнути подвійного URL-кодування cookie.
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

      return NextResponse.json(apiRes.data, { status: apiRes.status });
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
