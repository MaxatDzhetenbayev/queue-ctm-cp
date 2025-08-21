"use client";

import React from "react";

import { ChartConfig } from "@/shared/components/ui/chart";

import { ActivityChart } from "./ActivityChart";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  StateWrapper,
} from "./ActivityStates";

import { useGetActivityAnalytics } from "../../application/use-cases/get-analytics-activity";
import { activityConfig } from "../../domain/configs";

export const ActivityAnalytics = () => {
  const { data, isLoading, isError } = useGetActivityAnalytics();

  // Состояние загрузки
  if (isLoading) {
    return <LoadingState />;
  }

  // Состояние ошибки
  if (isError) {
    return (
      <StateWrapper title={activityConfig.MAIN_CONFIG.title}>
        <ErrorState />
      </StateWrapper>
    );
  }

  // Проверка на пустые данные
  if (!data || data.length === 0) {
    return (
      <StateWrapper title={activityConfig.MAIN_CONFIG.title}>
        <EmptyState />
      </StateWrapper>
    );
  }

  // Конфигурация графика
  const chartConfig: ChartConfig = {
    records: {
      label: activityConfig.chartConfig.records.label,
      color: activityConfig.chartConfig.records.color,
    },
  };

  return (
    <StateWrapper title={activityConfig.MAIN_CONFIG.title}>
      <div className="px-2 pt-6 sm:p-6">
        <ActivityChart data={data} chartConfig={chartConfig} />
      </div>
    </StateWrapper>
  );
};
