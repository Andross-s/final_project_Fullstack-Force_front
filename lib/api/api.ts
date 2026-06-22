import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

if (process.env.NODE_ENV === 'development') {
  nextServer.interceptors.request.use(config => {
    let logData = config.data;

    if (logData && typeof logData === 'object') {
      logData = { ...logData };
      if ('password' in logData) {
        logData.password = '********';
      }
    }

    console.log(
      '[API] Request:',
      config.method,
      `${config.baseURL ?? ''}${config.url ?? ''}`,
      logData ?? ''
    );

    return config;
  });

  nextServer.interceptors.response.use(res => {
    console.log('[API] Response:', res.status, res.config.url, res.data);
    return res;
  });
}

const AUTH_EXCLUDED_PATHS = ['/api/auth/refresh', '/api/auth/login', '/api/auth/register'];
const isAuthExcluded = (url?: string) =>
  Boolean(url && AUTH_EXCLUDED_PATHS.some(path => url.includes(path)));

let refreshPromise: Promise<boolean> | null = null;
function refreshOnce(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = nextServer
      .post('/api/auth/refresh')
      .then(() => true)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

function clearLocalAuth() {
  useAuthStore.getState().clearIsAuthenticated();
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userId');
  }
}

nextServer.interceptors.response.use(
  res => res,
  async error => {
    const status = error?.response?.status;
    const originalRequest = error?.config;
    const url: string | undefined = originalRequest?.url;

    if (process.env.NODE_ENV === 'development') {
      console.error('[API] Error:', status, url, error?.response?.data ?? error.message);
    }

    if (status !== 401 || isAuthExcluded(url) || originalRequest?._retried) {
      return Promise.reject(error);
    }

    const refreshed = await refreshOnce();

    if (refreshed) {
      originalRequest._retried = true;
      try {
        return await nextServer.request(originalRequest);
      } catch (retryError) {
        clearLocalAuth();
        return Promise.reject(retryError);
      }
    }

    clearLocalAuth();
    return Promise.reject(error);
  }
);

export interface CheckSession {
  success: boolean;
}
