import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST() {
  try {
    const cookieStore = await cookies();

    await api.post('/api/auth/logout', null, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    cookieStore.delete('sessionId');
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return NextResponse.json({ message: 'Logged out' }, { status: 200 });
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
