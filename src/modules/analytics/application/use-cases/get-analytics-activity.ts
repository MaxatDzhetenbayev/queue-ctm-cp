import { ActivityAnalyticsSchemaType } from "@/modules/analytics/domain/schemas/analytics";

import { fetchGetActivityAnalytics } from "../../infrastructure/api/client.api";
import { useQuery } from "@tanstack/react-query";

export const useGetActivityAnalytics = () => {
  return useQuery<ActivityAnalyticsSchemaType>({
    queryFn: () => fetchGetActivityAnalytics(),
    queryKey: ["activity-analytics"],
  });
};
