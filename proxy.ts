import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/add-recipe'];
const publicRoutes = ['/auth'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  if (!isPublicRoute && !isPrivateRoute) return NextResponse.next();
  const hasValidSession = Boolean(accessToken || refreshToken);

  if (isPublicRoute) {
    if (hasValidSession) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (isPrivateRoute) {
    if (!hasValidSession) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/profile/:path*', '/add-recipe/:path*', '/auth/:path*'],
};
