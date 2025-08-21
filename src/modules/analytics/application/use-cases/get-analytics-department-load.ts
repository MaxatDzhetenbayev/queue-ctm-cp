import { DepartmentLoadAnalyticsSchemaType } from "@/modules/analytics/domain/schemas/analytics";
import { fetchGetDepartmentLoad } from "@/modules/analytics/infrastructure/api/client.api";

import { useQuery } from "@tanstack/react-query";

export const useGetDepartmentLoads = () => {
  return useQuery<DepartmentLoadAnalyticsSchemaType>({
    queryFn: () => fetchGetDepartmentLoad(),
    queryKey: ["department-loads"],
  });
};
