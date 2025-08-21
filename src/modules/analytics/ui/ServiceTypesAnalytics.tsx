"use client";

import React, { useState } from "react";

import { useGetServiceTypeCount } from "@/modules/analytics/application/use-cases/get-analytics-service-type-counts";
import { ChartConfig } from "@/shared/components/ui/chart";

import {
  ServiceTypesEmptyState,
  ServiceTypesErrorState,
  ServiceTypesLoadingState,
  StateWrapper,
} from "./components/LoadStates";
import { ServiceTypeChart } from "./components/ServiceTypeChart";
import { ServiceTypeSelect } from "./components/ServiceTypeSelect";

import { serviceTypesConfig } from "../domain/configs";

export const ServiceTypesAnalytics = () => {
  const { data, isLoading, isError } = useGetServiceTypeCount();
  const [activeService, setActiveService] = useState<string>("");
  const chartId = "pie-interactive";

  if (isLoading) {
    return <ServiceTypesLoadingState />;
  }

  if (isError) {
    return (
      <StateWrapper title={serviceTypesConfig.MAIN_CONFIG.title}>
        <ServiceTypesErrorState />
      </StateWrapper>
    );
  }

  if (!data || data.length === 0) {
    return (
      <StateWrapper title={serviceTypesConfig.MAIN_CONFIG.title}>
        <ServiceTypesEmptyState />
      </StateWrapper>
    );
  }

  if (activeService === "" && data && data.length > 0) {
    setActiveService(data[0].name.ru);
  }

  const chartConfig: ChartConfig = data.reduce((acc, item, index) => {
    acc[item.name.ru] = {
      label: item.name.ru,
      color: `var(--chart-${index + 1})`,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <div
      data-chart={chartId}
      className="flex flex-col rounded-xl shadow-sm border border-gray-200 p-5"
    >
      <div className="flex-row items-start space-y-0 pb-0 mb-4">
        <div className="grid gap-1">
          <h2 className="pl-4 text-2xl font-bold text-gray-900">
            {serviceTypesConfig.MAIN_CONFIG.title}
          </h2>
        </div>
        <ServiceTypeSelect
          data={data}
          activeService={activeService}
          onServiceChange={setActiveService}
          chartConfig={chartConfig}
        />
      </div>
      <div className="flex flex-1 justify-center pb-0">
        <ServiceTypeChart
          data={data}
          activeService={activeService}
          chartConfig={chartConfig}
          chartId={chartId}
        />
      </div>
    </div>
  );
};
