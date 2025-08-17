import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Интерцептор ответа
axiosApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // ждем пока другой запрос обновит токен
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              // пробуем повторить запрос
              originalRequest.headers = {
                ...originalRequest.headers,
              };
              resolve(axiosApi(originalRequest));
            },
            reject,
            config: originalRequest,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // дергаем refresh
        await axiosApi.post("/auth/refresh");

        processQueue(null, null);

        return axiosApi(originalRequest); // повторяем изначальный запрос
      } catch (err) {
        processQueue(err, null);

        // тут можно вызвать logout, например, очистку стейта
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
