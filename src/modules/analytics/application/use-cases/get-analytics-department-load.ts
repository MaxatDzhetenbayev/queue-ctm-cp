import { DepartmentLoadAnalyticsSchemaType } from "@/modules/analytics/domain/schemas/analytics";
import { useAnalyticsDateStore } from "@/modules/analytics/domain/stores/analytics-date.store";
import { fetchGetDepartmentLoad } from "@/modules/analytics/infrastructure/api/client.api";

import { useQuery } from "@tanstack/react-query";

export const useGetDepartmentLoads = () => {
  const { selectedDate } = useAnalyticsDateStore();

  return useQuery<DepartmentLoadAnalyticsSchemaType>({
    queryFn: () => fetchGetDepartmentLoad(selectedDate || undefined),
    queryKey: ["department-loads", selectedDate],
  });
};
