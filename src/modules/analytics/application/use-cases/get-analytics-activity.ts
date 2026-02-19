import { ActivityAnalyticsSchemaType } from "@/modules/analytics/domain/schemas/analytics";
import { useAnalyticsDateStore } from "@/modules/analytics/domain/stores/analytics-date.store";

import { fetchGetActivityAnalytics } from "../../infrastructure/api/client.api";
import { useQuery } from "@tanstack/react-query";

export const useGetActivityAnalytics = () => {
  const { centerId } = useAnalyticsDateStore();

  return useQuery<ActivityAnalyticsSchemaType>({
    queryFn: () => fetchGetActivityAnalytics(centerId || undefined),
    queryKey: ["activity-analytics", centerId],
  });
};
