import { api } from "@/shared";
import { useQuery } from "@tanstack/react-query";

export interface IManager {
  id: number;
  full_name: string;
  phone: string;
  isOnline: boolean;
}

export interface IManagers {
  managers: IManager[];
  page: number;
  total: number;
  totalPages: number;
}

export interface IManagerOption {
  page: number;
  search: string;
  departmentId: string;
}

export const useManagersList = ({
  page,
  search,
  departmentId,
}: IManagerOption) => {
  return useQuery<IManagers>({
    queryKey: ["managers", page, search, departmentId],
    queryFn: async () =>
      (
        await api.get(`/users/managers/center`, {
          params: {
            search,
            page,
            departmentId,
            limit: 8,
          },
        })
      ).data,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });
};
