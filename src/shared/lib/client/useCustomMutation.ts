import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { queryClient } from "./query-client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type QueryConfig = {
  queryKey: Array<unknown>;
  refetchType?: "invalidate" | "refetch";
  exact?: boolean;
};

/**
 * Примеры использования:
 *
 * // Простая инвалидация (обратная совместимость)
 * invalidateQueries: [["users"], ["posts"]]
 *
 * // Инвалидация с конфигурацией
 * invalidateQueries: [
 *   ["users"],
 *   { queryKey: ["posts"], exact: true }
 * ]
 *
 * // Перезагрузка запросов
 * invalidateQueries: [
 *   ["users"],
 *   { queryKey: ["client-info"], refetchType: "refetch" }
 * ]
 *
 * // Смешанное использование
 * invalidateQueries: [
 *   ["manager-receptions"],
 *   { queryKey: ["client-info"], refetchType: "refetch", exact: false }
 * ]
 */

/**
 * Кастомный хук для выполнения мутаций с использованием React Query и Axios.
 * Предварительно обрабатывает успех и ошибки, отображая уведомления с помощью toast.
 *
 * @param {Object} mutationFn - Объект с параметрами для хука.
 * @param {function(TVariables): Promise<TData>} mutationFn.mutationFn - Функция, выполняющая мутацию и возвращающая промис.
 * @param {UseMutationOptions<TData, TError, TVariables, TContext>} [mutationFn.mutationConfig] - Дополнительные параметры конфигурации для мутации.
 * @param {Object} [mutationFn.customConfig] - Дополнительные настройки для кастомизации поведения мутации.
 * @param {Array<Array<unknown> | QueryConfig>} [mutationFn.customConfig.invalidateQueries] - Массив ключей запросов или конфигураций запросов для инвалидации/перезагрузки.
 * @param {Object} [mutationFn.toastConfig] - Конфигурация для уведомлений toast, содержащая сообщения для успеха и ошибки.
 * @param {string|function(TData): string} [mutationFn.toastConfig.successMessage] - Сообщение для успешной мутации.
 * @param {string|function(TError): string} [mutationFn.toastConfig.errorMessage] - Сообщение для ошибки мутации.
 * @param mutationFn.customConfig.onSuccess - Функция, вызываемая при успешной мутации.
 * @param mutationFn.customConfig.onError	 - Функция, вызываемая при ошибке мутации.
 * @returns Объект мутации, содержащий методы и состояние, связанные с мутацией.
 */
export function useCustomMutation<
  TData = unknown,
  TError = AxiosError,
  TVariables = unknown,
  TContext = unknown
>({
  mutationFn,
  mutationConfig = {},
  customConfig = {},
  toastConfig = {},
}: {
  mutationFn: (variables: TVariables) => Promise<TData>;
  mutationConfig?: UseMutationOptions<TData, TError, TVariables, TContext>;
  customConfig?: {
    onSuccess?: (data: TData, variables: TVariables, context: TContext) => void;
    onError?: (error: TError, variables: TVariables) => void;
    invalidateQueries?: Array<Array<unknown> | QueryConfig>;
  };
  toastConfig?: {
    successMessage?: string | ((data: TData) => string);
    errorMessage?: string | ((error: TError) => string);
  };
}) {
  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data, variables, context) => {
      if (customConfig?.invalidateQueries) {
        customConfig.invalidateQueries.forEach((queryConfig) => {
          // Проверяем, является ли queryConfig объектом с конфигурацией
          if (typeof queryConfig === "object" && "queryKey" in queryConfig) {
            const config = queryConfig as QueryConfig;

            if (config.refetchType === "refetch") {
              queryClient.refetchQueries({
                queryKey: config.queryKey,
                exact: config.exact,
              });
            } else {
              // По умолчанию invalidate
              queryClient.invalidateQueries({
                queryKey: config.queryKey,
                exact: config.exact,
              });
            }
          } else {
            // Обратная совместимость с массивом ключей
            queryClient.invalidateQueries({
              queryKey: queryConfig as Array<unknown>,
            });
          }
        });
      }

      if (toastConfig?.successMessage) {
        const successMessage =
          typeof toastConfig?.successMessage === "function"
            ? toastConfig.successMessage(data)
            : toastConfig?.successMessage;

        toast.success(successMessage);
      } else {
        toast.success("Успешная мутация!");
      }

      customConfig?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables) => {
      const axiosError = error as AxiosError;

      const rawMessage = (
        axiosError.response?.data as { message?: string | string[] } | undefined
      )?.message;

      const errorMessage =
        typeof toastConfig?.errorMessage === "function"
          ? toastConfig.errorMessage(error)
          : toastConfig?.errorMessage;

      if (errorMessage) {
        toast.error(errorMessage);
      } else if (Array.isArray(rawMessage)) {
        rawMessage.forEach((msg) => toast.error(msg));
      } else if (typeof rawMessage === "string") {
        toast.error(rawMessage);
      } else {
        toast.error(axiosError.message ?? "Произошла ошибка");
      }

      customConfig?.onError?.(error, variables);
    },
    ...mutationConfig,
  });
  return mutation;
}
