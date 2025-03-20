import { api } from "@/shared";
import { useQuery } from "@tanstack/react-query";

export interface IManager {
  id: number;
  full_name: string;
  phone: string;
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
}

export const useManagersList = ({ page, search }: IManagerOption) => {
  console.log(page, search);
  return useQuery<IManagers>({
    queryKey: ["managers", page, search],
    queryFn: async () =>
      (
        await api.get(`/users/managers/center`, {
          params: {
            search,
            page,
            limit: 8,
          },
        })
      ).data,
  });
};
