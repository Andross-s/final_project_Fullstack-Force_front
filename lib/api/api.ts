// import axios from "axios";

// export const nextServer = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
// });



import axios from "axios";

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true,
});

// Simple request/response logging for development
if (process.env.NODE_ENV === "development") {
  nextServer.interceptors.request.use((config) => {
    console.log(
      "[API] Request:",
      config.method?.toUpperCase(),
      `${config.baseURL ?? ""}${config.url ?? ""}`,
      config.data ?? ""
    );

    return config;
  });

  nextServer.interceptors.response.use(
    (response) => {
      console.log(
        "[API] Response:",
        response.status,
        response.config.url,
        response.data
      );

      return response;
    },
    (error) => {
      console.error(
        "[API] Error:",
        error?.response?.status,
        error?.config?.url,
        error?.response?.data ?? error.message
      );

      return Promise.reject(error);
    }
  );
}

export interface CheckSession {
  success: boolean;
}