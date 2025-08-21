import { AlertCircle, BarChart3, PieChart } from "lucide-react";

import { MAIN_CONFIG as departmentLoadConfig } from "../../domain/configs/department-load.config";
import { MAIN_CONFIG as serviceTypesConfig } from "../../domain/configs/service-types.config";
import { DepartmentLoadSkeleton } from "../department-load-analytics";
import { ServiceTypesSkeleton } from "../service-types-analytics";

interface StateComponentProps {
  title: string;
  children: React.ReactNode;
}

export const StateWrapper = ({ title, children }: StateComponentProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 ">
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </div>
);

// DepartmentLoad States
export const LoadingState = () => (
  <StateWrapper title={departmentLoadConfig.title}>
    <DepartmentLoadSkeleton />
  </StateWrapper>
);

export const ErrorState = () => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      {departmentLoadConfig.messages.errorTitle}
    </h3>
    <p className="text-gray-600 max-w-md">
      {departmentLoadConfig.messages.error}
    </p>
  </div>
);

export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <BarChart3 className="h-12 w-12 text-gray-400 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      {departmentLoadConfig.messages.emptyTitle}
    </h3>
    <p className="text-gray-600 max-w-md">
      {departmentLoadConfig.messages.empty}
    </p>
  </div>
);

// ServiceTypes States
export const ServiceTypesLoadingState = () => (
  <StateWrapper title={serviceTypesConfig.title}>
    <ServiceTypesSkeleton />
  </StateWrapper>
);

export const ServiceTypesErrorState = () => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      {serviceTypesConfig.messages.errorTitle}
    </h3>
    <p className="text-gray-600 max-w-md">
      {serviceTypesConfig.messages.error}
    </p>
  </div>
);

export const ServiceTypesEmptyState = () => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <PieChart className="h-12 w-12 text-gray-400 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      {serviceTypesConfig.messages.emptyTitle}
    </h3>
    <p className="text-gray-600 max-w-md">
      {serviceTypesConfig.messages.empty}
    </p>
  </div>
);
