"use client";

import {
  useCheckManagerOnline,
  useStartManagerWork,
} from "@/modules/activity/application/use-cases";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

export const ManagerStartWork = () => {
  const { data, isLoading, isError } = useCheckManagerOnline();
  const { mutate: startWork, isPending } = useStartManagerWork();

  // Если загрузка или менеджер уже онлайн, не показываем модальное окно
  if (isLoading || data?.isOnline === true) {
    return null;
  }

  const handleStartWork = () => {
    startWork({});
  };

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogHeader>
        <DialogTitle>
          Добро пожаловать в панель управления очередью!
        </DialogTitle>
        <DialogDescription>
          Добро пожаловать в панель управления очередью!
        </DialogDescription>
      </DialogHeader>
      <DialogContent className="sm:max-w-lg" showCloseButton={false}>
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          <h3 className="text-xl font-semibold text-center">
            {isError ? (
              <>
                Рабочее время окончено. <br /> До следующего рабочего дня!
              </>
            ) : (
              "Добро пожаловать в панель управления очередью!"
            )}
          </h3>

          {!isError && (
            <Button
              onClick={handleStartWork}
              disabled={isPending}
              className="w-full max-w-xs"
            >
              {isPending ? "Загрузка..." : "Приступить к работе"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
