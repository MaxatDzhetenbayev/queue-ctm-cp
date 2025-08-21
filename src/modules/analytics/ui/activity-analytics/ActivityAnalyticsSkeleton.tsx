import { Skeleton } from "@/shared/components/ui/skeleton";

export const ActivityAnalyticsSkeleton = () => {
  return (
    <div className="flex flex-col rounded-xl shadow-sm border border-gray-200 p-5">
      {/* Заголовок */}
      <div className="flex flex-col items-stretch border-b p-0 mb-4">
        <Skeleton className="h-8 w-48" />
      </div>

      {/* График */}
      <div className="px-2 sm:p-6">
        <div className="aspect-auto h-[250px] w-full">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};
