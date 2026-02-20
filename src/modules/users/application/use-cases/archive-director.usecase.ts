import { useCustomMutation } from "@/shared/lib/client";
import { archiveEmployee } from "../../infrastructure/api/employee.api";

export const useArchiveDirector = (directorId: string) => {
  return useCustomMutation({
    mutationFn: () => archiveEmployee(directorId),
    customConfig: {
      invalidateQueries: [
        ["director-list"],
        ["employee-list", directorId],
      ],
    },
    toastConfig: {
      successMessage: "Директор перенесен в архив",
    },
  });
};
