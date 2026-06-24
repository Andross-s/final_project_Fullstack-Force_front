import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { isAxiosError } from 'axios';
import { forwardSetCookies, logErrorResponse } from '../../_utils/utils';

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

    forwardSetCookies(apiRes.headers['set-cookie'], cookieStore);

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
