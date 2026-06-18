import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

// масив приватних маршрутів
const privateRoutes = ['/profile', '/add-recipe'];
// масив публічних маршрутів;
// перевіряємо: якщо користувач має токен і намагається зайти на публічний маршрут-перенаправляємо на головну;
// додаємо ці маршрути в matcher.
const publicRoutes = ['/auth/login', '/auth/register'];

export async function proxy(request: NextRequest) {
  // Шлях, на який користувач намагається перейти
  const { pathname } = request.nextUrl;

  // Отримання токенів із cookie
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  // Якщо це публічний маршрут і користувач вже має accessToken – перенаправляємо на головну

  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  // Якщо це приватний маршрут :
  if (!accessToken) {
    if (refreshToken) {
      // Якщо accessToken відсутній, але є refreshToken — потрібно перевірити сесію навіть для публічного маршруту,
      // адже сесія може залишатися активною, і тоді потрібно заборонити доступ до публічного маршруту.
      const data = await checkServerSession();
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
        // Якщо сесія все ще активна:
        // для публічного маршруту — виконуємо редірект на головну.
        if (isPublicRoute) {
          return NextResponse.redirect(new URL('/', request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
        // для приватного маршруту — дозволяємо доступ
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }
    // Якщо refreshToken або сесії немає:
    // публічний маршрут — дозволяємо доступ
    if (isPublicRoute) {
      return NextResponse.next();
    }

    // приватний маршрут — редірект на сторінку входу
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Якщо accessToken існує:
  // публічний маршрут — виконуємо редірект на головну
  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  // приватний маршрут — дозволяємо доступ
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

// об'єкт config, у якому вказуємо маршрути, до яких застосовується proxy.
// У config вказуємо, для яких маршрутів має запускатися proxy.
// Для цього служить властивість matcher
export const config = {
  matcher: ['/profile/:path*', '/auth/login', '/auth/register', '/add-recipe'],
};
