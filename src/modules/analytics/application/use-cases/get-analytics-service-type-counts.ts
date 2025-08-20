import { ServiceTypeCountsSchemaType } from "@/modules/analytics/domain/schemas/analytics";
import { fetchGetServiceTypeCounts } from "@/modules/analytics/infrastructure/api/client.api";

import { useQuery } from "@tanstack/react-query";

export const useGetServiceTypeCount = () => {
  return useQuery<ServiceTypeCountsSchemaType>({
    queryFn: () => fetchGetServiceTypeCounts(),
    queryKey: ["service-type-counts"],
  });
};
