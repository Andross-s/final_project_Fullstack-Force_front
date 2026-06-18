import axios from 'axios';

// axios.defaults.baseURL = 'https://final-project-fullstack-force-back-r48i.onrender.com';
// axios.defaults.baseURL = 'http://localhost:3000';

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
