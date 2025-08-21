import { Skeleton } from "@/shared/components/ui/skeleton";

export const ServiceTypesSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Skeleton className="self-end h-8 w-[170px]" />

      <div className="relative">
        <Skeleton className="w-[300px] h-[300px] rounded-full" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
};
