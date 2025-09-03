import { ServiceTypeCountsSchemaType } from "@/modules/analytics/domain/schemas/analytics";
import { useAnalyticsDateStore } from "@/modules/analytics/domain/stores/analytics-date.store";
import { fetchGetServiceTypeCounts } from "@/modules/analytics/infrastructure/api/client.api";

import { useQuery } from "@tanstack/react-query";

export const useGetServiceTypeCount = () => {
  const { selectedDate } = useAnalyticsDateStore();

  return useQuery<ServiceTypeCountsSchemaType>({
    queryFn: () => fetchGetServiceTypeCounts(selectedDate || undefined),
    queryKey: ["service-type-counts", selectedDate],
  });
};
