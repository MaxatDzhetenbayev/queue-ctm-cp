import { axiosApi } from "@/shared/lib/client";

import { CreateEmployeeType } from "../../domain/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateEmployeeType) => {
      const response = await axiosApi.post("/users", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["managers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
};
