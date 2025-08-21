import { Skeleton } from "@/shared/components/ui/skeleton";

export const ReceptionsAuthTypeSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Skeleton className="w-[250px] h-[250px] rounded-full" />
    </div>
  );
};
