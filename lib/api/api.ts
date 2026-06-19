import axios from 'axios';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

if (process.env.NODE_ENV === 'development') {
  nextServer.interceptors.request.use(config => {
    console.log(
      '[API] Request:',
      config.method,
      `${config.baseURL ?? ''}${config.url ?? ''}`,
      config.data ?? ''
    );
    return config;
  });

  nextServer.interceptors.response.use(
    res => {
      console.log('[API] Response:', res.status, res.config.url, res.data);
      return res;
    },
    err => {
      const status = err?.response?.status;
      const url = err?.config?.url;
      if (status === 401 && url?.includes('/api/auth/refresh')) {
        console.warn('[API] No active session found (401 Refresh skipped)');
        return Promise.reject(err);
      }
      console.error(
        '[API] Error:',
        err?.response?.status,
        err?.config?.url,
        err?.response?.data ?? err.message
      );
      return Promise.reject(err);
    }
  );
}

export interface CheckSession {
  success: boolean;
}
