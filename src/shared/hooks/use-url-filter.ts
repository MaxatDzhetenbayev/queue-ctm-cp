"use client";

import { useRouter, useSearchParams } from "next/navigation";

type ParamKeys<T extends readonly string[]> = {
  [K in T[number] as `selected${Capitalize<K>}`]: string | null;
} & {
  setPathParams: (key: T[number], value: string) => void;
  handleClearUrlFilters: () => void;
};

/**
 * Кастомный хук для управления параметрами поиска URL и выбранными значениями.
 *
 * @param keys - Массив ключей параметров для отслеживания в URL.
 * @returns Объект, содержащий выбранные значения и функцию установки параметров пути.
 */
export function useUrlFilter<const T extends readonly string[]>(
  keys: T
): ParamKeys<T> {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValues = keys.reduce((acc, key) => {
    acc[`selected${key.charAt(0).toUpperCase()}${key.slice(1)}`] =
      searchParams.get(key);
    return acc;
  }, {} as Record<string, string | null>);

  const setPathParams = (key: T[number], value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value.trim() !== "" && value.trim() !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page" && params.has("page")) {
      params.delete("page");
    }

    router.replace(`?${params.toString()}`);
  };

  const handleClearUrlFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    keys.forEach((key) => {
      params.delete(key);
    });
    router.replace(`?${params.toString()}`);
  };

  return {
    ...selectedValues,
    setPathParams,
    handleClearUrlFilters,
  } as ParamKeys<T>;
}
