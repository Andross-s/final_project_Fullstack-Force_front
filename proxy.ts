import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/add-recipe'];
const publicRoutes = ['/auth'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Просто пасивно зчитуємо куки, які прийшли з браузера
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  // Якщо маршрут не приватний і не публічний (наприклад, головна сторінка) — просто йдемо далі
  if (!isPublicRoute && !isPrivateRoute) return NextResponse.next();

  // СЕСІЯ ВВАЖАЄТЬСЯ ЖИВОЮ, ЯКЩО Є ХОЧА Б РЕФРЕШ-ТОКЕН!
  const hasValidSession = Boolean(accessToken || refreshToken);

  if (isPublicRoute) {
    // Якщо користувач уже авторизований (хоча б по рефрешу), не пускаємо його на сторінки логіну/реєстрації
    if (hasValidSession) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (isPrivateRoute) {
    // Якщо користувач лізе на приватну сторінку і в куках взагалі порожньо — на логін
    if (!hasValidSession) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Якщо аксесу немає, але рефреш є — мідлвара просто пропускає запит у браузер.
    // Там клієнтський Axios сам зробить один чистий рефреш через інтерцептор.
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/profile/:path*', '/add-recipe/:path*', '/auth/:path*'],
};
