import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { refreshSession } from './lib/api/client';

const privateRoutes = ['/profile', '/add-recipe'];
const publicRoutes = ['/auth'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  if (!accessToken) {
    if (refreshToken) {
      try {
        const data = await refreshSession();
        const setCookie = data.headers['set-cookie'];

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed['Max-Age']),
            };
            if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
            if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
          }

          if (isPublicRoute) {
            return NextResponse.redirect(new URL('/', request.url), {
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }

          if (isPrivateRoute) {
            return NextResponse.next({
              headers: {
                Cookie: cookieStore.toString(),
              },
            });
          }
        }
      } catch {
        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');
      }
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/profile/:path*', '/add-recipe/:path*', '/auth/:path*'],
};
