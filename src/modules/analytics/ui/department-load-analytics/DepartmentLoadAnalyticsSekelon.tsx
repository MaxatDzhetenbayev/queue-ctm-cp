import { Skeleton } from "@/shared/components/ui/skeleton";

import { MAIN_CONFIG } from "../../domain/configs/department-load.config";

export const DepartmentLoadSkeleton = () => {
  const { itemsCount, itemHeight, labelWidth, valueWidth } =
    MAIN_CONFIG.skeleton;

  return (
    <div className="space-y-3">
      {Array.from({ length: itemsCount }, (_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Skeleton className={`${itemHeight} ${labelWidth}`} />
          <div className="flex-1">
            <Skeleton className={`${itemHeight} w-full`} />
          </div>
          <Skeleton className={`${itemHeight} ${valueWidth}`} />
        </div>
      ))}
    </div>
  );
};
