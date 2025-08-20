import React from "react";

import { Skeleton } from "@/shared/components/ui/skeleton";

export const EmployeeCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="p-2 mr-3" />
        <Skeleton className="h-4 grow" />
        <Skeleton className="h-12 w-12 rounded-full ml-2" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Skeleton className="h-4 w-16" />
        <div className="flex flex-wrap gap-1 mt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};
