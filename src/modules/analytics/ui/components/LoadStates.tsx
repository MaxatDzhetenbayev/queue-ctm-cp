import { AlertCircle, BarChart3 } from "lucide-react";

import { Skeleton } from "@/shared/components/ui/skeleton";

import { MAIN_CONFIG } from "../../domain/configs/department-load.config";
import { DepartmentLoadSkeleton } from "../DepartmentLoadAnalyticsSekelon";

interface StateComponentProps {
  title: string;
  children: React.ReactNode;
}

export const StateWrapper = ({ title, children }: StateComponentProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
);

export const LoadingState = () => (
  <StateWrapper title={MAIN_CONFIG.title}>
    <Skeleton
      className={`h-8 ${MAIN_CONFIG.skeleton.headerWidth}`}
    />
    <div className="mt-4">
      <DepartmentLoadSkeleton />
    </div>
  </StateWrapper>
);

export const ErrorState = () => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      {MAIN_CONFIG.messages.errorTitle}
    </h3>
    <p className="text-gray-600 max-w-md">
      {MAIN_CONFIG.messages.error}
    </p>
  </div>
);

export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      {MAIN_CONFIG.messages.emptyTitle}
    </h3>
    <p className="text-gray-600 max-w-md">
      {MAIN_CONFIG.messages.empty}
    </p>
  </div>
);
