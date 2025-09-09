"use client";

import React, { useState } from "react";

import { useGetServiceTypeCount } from "@/modules/analytics/application/use-cases/get-analytics-service-type-counts";
import { ChartConfig } from "@/shared/components/ui/chart";

import { ServiceTypeChart } from "./ServiceTypeChart";
import { ServiceTypesSkeleton } from "./ServiceTypesAnalyticsSkeleton";
import { ServiceTypeSelect } from "./ServiceTypeSelect";

import { serviceTypesConfig } from "../../domain/configs";
import { EmptyState, ErrorState, StateWrapper } from "../components/LoadStates";

export const ServiceTypesAnalytics = () => {
  const { data, isLoading, isError } = useGetServiceTypeCount();
  const [activeService, setActiveService] = useState<string>("");
  const chartId = "pie-interactive";

  if (isLoading) {
    return (
      <StateWrapper title={serviceTypesConfig.MAIN_CONFIG.title}>
        <ServiceTypesSkeleton />
      </StateWrapper>
    );
  }

  if (isError) {
    return (
      <StateWrapper title={serviceTypesConfig.MAIN_CONFIG.title}>
        <ErrorState />
      </StateWrapper>
    );
  }

  if (!data || data.length === 0) {
    return (
      <StateWrapper title={serviceTypesConfig.MAIN_CONFIG.title}>
        <EmptyState />
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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {serviceTypesConfig.MAIN_CONFIG.title}
        </h2>
        <ServiceTypeSelect
          data={data}
          activeService={activeService}
          onServiceChange={setActiveService}
          chartConfig={chartConfig}
        />
      </div>
      <div className="flex  justify-center mt-8 max-h-[250px]">
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
