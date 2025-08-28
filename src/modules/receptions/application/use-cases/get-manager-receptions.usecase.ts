import { fetchManagerReceptions } from "@/modules/receptions/infrastructure/api/reception.api";

import { useQuery } from "@tanstack/react-query";

interface GetManagerReceptionsParams {
  search?: string;
  status?: string;
  date?: string;
}

export const useGetManagerReceptions = (
  params?: GetManagerReceptionsParams
) => {
  return useQuery({
    queryKey: ["manager-receptions", params],
    queryFn: () => fetchManagerReceptions(params),
    refetchInterval: 1 * 60 * 1000, // Обновляем каждые 1 минуту для реального времени
    placeholderData: (previousData) => previousData, // Показываем старые данные во время загрузки новых
  });
};
