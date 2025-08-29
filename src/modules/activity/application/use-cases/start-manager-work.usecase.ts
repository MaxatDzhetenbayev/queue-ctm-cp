import { startManagerWork } from "@/modules/activity/infrastructure/api";
import { useCustomMutation } from "@/shared/lib/client";

export const useStartManagerWork = () => {
  return useCustomMutation({
    mutationFn: startManagerWork,
    customConfig: {
      invalidateQueries: [["manager-online-check"]],
    },
    toastConfig: {
      successMessage: "Работа успешно начата",
    },
  });
};
