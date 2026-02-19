"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { useGetReceptionsAuthType } from "@/modules/analytics/application/use-cases/get-analytics-receptions-auth-type";
import { ChartConfig } from "@/shared/components/ui/chart";

import { ReceptionsAuthTypeChart } from "./ReceptionsAuthTypeChart";
import { ReceptionsAuthTypeSelect } from "./ReceptionsAuthTypeSelect";
import { ReceptionsAuthTypeSkeleton } from "./ReceptionsAuthTypeSkeleton";

import { receptionsAuthTypeConfig } from "../../domain/configs";
import { receptionsAuthTypeTypes } from "../../domain/types";
import { EmptyState, ErrorState, StateWrapper } from "../components/LoadStates";

export const ReceptionsAuthTypeAnalytics = () => {
  const { data, isLoading, isError } = useGetReceptionsAuthType();
  const t = useTranslations("analytics.receptionsAuthType");
  const [activeType, setActiveType] = useState<string>("");
  const chartId = "receptions-auth-type-pie";

  if (isLoading) {
    return (
      <StateWrapper title={t("title")}>
        <ReceptionsAuthTypeSkeleton />
      </StateWrapper>
    );
  }

  if (isError) {
    return (
      <StateWrapper title={t("title")}>
        <ErrorState />
      </StateWrapper>
    );
  }

  if (!data || data.length === 0) {
    return (
      <StateWrapper title={t("title")}>
        <EmptyState />
      </StateWrapper>
    );
  }

  const AUTH_TYPES_TO_HIDE = ["CREDENTIALS"];

  // Преобразуем данные в формат для графика (без CREDENTIALS)
  const chartData: receptionsAuthTypeTypes.ReceptionsAuthTypeChartData[] =
    data
      .filter((item) => {
        const type = Object.keys(item)[0];
        return type && !AUTH_TYPES_TO_HIDE.includes(type);
      })
      .map((item) => {
        const entries = Object.entries(item);
        const [type, value] = entries[0];
        const config =
          receptionsAuthTypeConfig.MAIN_CONFIG.authTypes[
            type as keyof typeof receptionsAuthTypeConfig.MAIN_CONFIG.authTypes
          ];

        return {
          name: type,
          value: value as unknown as number,
          fill:
            config?.color || receptionsAuthTypeConfig.chartConfig.defaultColor,
          label: config?.label || type,
        };
      });

  if (chartData.length === 0) {
    return (
      <StateWrapper title={t("title")}>
        <EmptyState />
      </StateWrapper>
    );
  }

  // Установка активного типа по умолчанию
  if (activeType === "" && chartData.length > 0) {
    setActiveType(chartData[0].name);
  }

  // Генерация конфигурации графика
  const chartConfig: ChartConfig = chartData.reduce((acc, item) => {
    acc[item.name] = {
      label: item.label,
      color: item.fill,
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
          {t("title")}
        </h2>
        <ReceptionsAuthTypeSelect
          data={chartData}
          activeType={activeType}
          onTypeChange={setActiveType}
          chartConfig={chartConfig}
        />
      </div>
      <div className="flex  mt-8 h-[250px]">
        <ReceptionsAuthTypeChart
          data={chartData}
          activeType={activeType}
          chartConfig={chartConfig}
          chartId={chartId}
        />
      </div>
    </div>
  );
};
