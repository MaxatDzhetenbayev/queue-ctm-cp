"use client";

import { useGetDepartmentLoads } from "@/modules/analytics/application/use-cases";

import { DepartmentLoadChart } from "./components/DepartmentLoadChart";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  StateWrapper,
} from "./components/LoadStates";

import { departmentLoadConfig } from "../domain/configs";
import { departmentLoadTypes } from "../domain/types";

export const DepartmentLoadAnalytics = () => {
  const { data, isLoading, isError } = useGetDepartmentLoads();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <StateWrapper title={departmentLoadConfig.MAIN_CONFIG.title}>
        <ErrorState />
      </StateWrapper>
    );
  }

  if (!data || data.length === 0) {
    return (
      <StateWrapper title={departmentLoadConfig.MAIN_CONFIG.title}>
        <EmptyState />
      </StateWrapper>
    );
  }

  const chartData: departmentLoadTypes.ChartDataItem[] = data.map(
    (item: departmentLoadTypes.DepartmentLoadData) => ({
      ...item,
      displayName: item.name.kz,
    })
  );

  return (
    <StateWrapper title={departmentLoadConfig.MAIN_CONFIG.title}>
      <DepartmentLoadChart data={chartData} />
    </StateWrapper>
  );
};
