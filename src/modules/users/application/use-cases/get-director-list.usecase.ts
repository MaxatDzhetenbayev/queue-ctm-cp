import {
  DirectorListResponse,
  fetchDirectorList,
} from "@/modules/users/infrastructure/api/director.api";
import { useQuery } from "@tanstack/react-query";

export const useGetDirectorList = ({
  centerId,
  page,
  limit,
  search,
  status,
}: {
  centerId: string;
  page?: number;
  limit?: number;
  search?: string;
  status?: string | null;
}) => {
  return useQuery<DirectorListResponse>({
    queryKey: ["director-list", centerId, page, limit, search, status],
    queryFn: () =>
      fetchDirectorList(centerId, {
        page,
        limit,
        search: search || undefined,
        status: status || undefined,
      }),
    enabled: !!centerId,
  });
};
