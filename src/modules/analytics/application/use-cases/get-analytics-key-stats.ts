import { fetchKeyStats } from "@/modules/analytics/api/client.api";
import { KeyStatsSchemaType } from "@/modules/analytics/schemas/analytics";

import { useQuery } from "@tanstack/react-query";

export const useGetKeyStats = () => {
  return useQuery<KeyStatsSchemaType>({
    queryFn: () => fetchKeyStats(),
    queryKey: ["key-stats"],
  });
};
