import { axiosApi, useCustomMutation } from "@/shared/lib/client";
import { CreateDirectorType } from "@/modules/users/domain/schemas";

export const useCreateDirector = () => {
  return useCustomMutation({
    mutationFn: async (data: CreateDirectorType) => {
      const response = await axiosApi.post("/users", data);
      return response.data;
    },
    customConfig: {
      invalidateQueries: [["director-list"]],
    },
    toastConfig: {
      successMessage: "Директор успешно создан",
      errorMessage: "Ошибка при создании директора",
    },
  });
};
