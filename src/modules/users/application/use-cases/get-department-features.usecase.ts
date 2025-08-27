import { axiosApi } from "@/shared/lib/client";

import { useQuery } from "@tanstack/react-query";

interface DepartmentFeature {
  id: string;
  type: string;
  value: string;
}

export const useGetDepartmentFeatures = (departmentId: string) => {
  return useQuery<DepartmentFeature[]>({
    queryKey: ["department-features", departmentId],
    queryFn: async () => {
      const res = await axiosApi.get(`/departments/${departmentId}/features`);
      return res.data;
    },
    enabled: !!departmentId,
  });
};
