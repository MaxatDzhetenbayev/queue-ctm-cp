import { DepartmentLoadAnalyticsSchemaType } from "@/modules/analytics/domain/schemas/analytics";
import { useAnalyticsDateStore } from "@/modules/analytics/domain/stores/analytics-date.store";
import { fetchGetDepartmentLoad } from "@/modules/analytics/infrastructure/api/client.api";

import { useQuery } from "@tanstack/react-query";

export const useGetDepartmentLoads = () => {
  const { selectedDate, centerId } = useAnalyticsDateStore();

  return useQuery<DepartmentLoadAnalyticsSchemaType>({
    queryFn: () =>
      fetchGetDepartmentLoad(
        selectedDate || undefined,
        centerId || undefined
      ),
    queryKey: ["department-loads", selectedDate, centerId],
  });
};
