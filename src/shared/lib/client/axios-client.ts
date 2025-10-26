import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value: AxiosResponse) => void;
  reject: (error: unknown) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      // Повторяем оригинальный запрос с обновленным токеном
      axiosApi(prom.config).then(prom.resolve).catch(prom.reject);
    }
  });

  failedQueue = [];
};

const redirectToLogin = () => {
  // Проверяем, что мы в браузере (не в SSR)
  if (typeof window !== "undefined") {
    const locale = window.location.pathname.split("/")[1];
    window.location.href = `/${locale}/login`;
  }
};

// Интерцептор ответа
axiosApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Обрабатываем только 401 ошибки для refresh токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Если это запрос на refresh токен, сразу редиректим на логин
      if (originalRequest.url?.includes("/auth/refresh")) {
        redirectToLogin();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // ждем пока другой запрос обновит токен
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
            config: originalRequest,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosApi.post("/auth/refresh");

        // Успешно обновили токен - обрабатываем очередь и повторяем запрос
        processQueue(null);
        return axiosApi(originalRequest);
      } catch (refreshError) {
        // Не удалось обновить токен - очищаем очередь и редиректим на логин
        processQueue(refreshError);
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
