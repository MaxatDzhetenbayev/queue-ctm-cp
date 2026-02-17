import { AlertCircle, BarChart3 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Skeleton } from "@/shared/components/ui/skeleton";

import { activityConfig } from "../../domain/configs";

interface StateComponentProps {
  title: string;
  children: React.ReactNode;
}

export const StateWrapper = ({ title, children }: StateComponentProps) => (
  <div className="flex flex-col rounded-xl shadow-sm  p-5">
    <div className="flex flex-col items-stretch border-b p-0 mb-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
);

export const LoadingState = () => (
  <StateWrapper title={activityConfig.MAIN_CONFIG.title}>
    <div className="px-2 sm:p-6">
      <Skeleton className="aspect-auto h-[250px] w-full rounded-lg" />
    </div>
  </StateWrapper>
);

export const ErrorState = () => {
  const t = useTranslations("analytics.activityChart");
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {activityConfig.MAIN_CONFIG.messages.errorTitle}
      </h3>
      <p className="text-gray-600 max-w-md">
        {activityConfig.MAIN_CONFIG.messages.error}
      </p>
    </div>
  );
};

export const EmptyState = () => {
  const t = useTranslations("analytics.activityChart");
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {activityConfig.MAIN_CONFIG.messages.emptyTitle}
      </h3>
      <p className="text-gray-600 max-w-md">
        {activityConfig.MAIN_CONFIG.messages.empty}
      </p>
    </div>
  );
};
