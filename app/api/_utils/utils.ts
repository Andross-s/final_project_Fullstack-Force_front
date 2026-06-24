import { parse } from 'cookie';
import type { cookies } from 'next/headers';

type CookieStore = Awaited<ReturnType<typeof cookies>>;

export function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

/* Переносить Set-Cookie з відповіді бекенду на cookies фронтенду. */
export function forwardSetCookies(setCookie: string | string[] | undefined, cookieStore: CookieStore): void {
  if (!setCookie) return;

  const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
  for (const cookieStr of cookieArray) {
    const [nameValue] = cookieStr.split(';');
    const separatorIndex = nameValue.indexOf('=');
    const name = nameValue.slice(0, separatorIndex).trim();
    const value = decodeURIComponent(nameValue.slice(separatorIndex + 1).trim());

    const parsed = parse(cookieStr);
    const options = {
      expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
      // Без явного fallback на '/' браузер сам обчислює default-path як каталог
      // URL проксі-роута (наприклад '/api/auth' для POST /api/auth/login),
      // через що кука не надсилається на інші роути (/api/user, /api/recipes).
      path: parsed.Path || '/',
      maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    };

    cookieStore.set(name, value, options);
  }
}
