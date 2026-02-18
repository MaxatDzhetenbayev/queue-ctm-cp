"use client";

import { useLocale, useTranslations } from "next-intl";

import { useGetDepartmentLoads } from "@/modules/analytics/application/use-cases";

import { DepartmentLoadChart } from "./DepartmentLoadChart";

import { departmentLoadTypes } from "../../domain/types";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  StateWrapper,
} from "../components/LoadStates";

export const DepartmentLoadAnalytics = () => {
  const { data, isLoading, isError } = useGetDepartmentLoads();
  const t = useTranslations("analytics.departmentLoad");
  const locale = useLocale();

  if (isLoading) {
    return <LoadingState />;
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

  const chartData: departmentLoadTypes.ChartDataItem[] = (data || []).map(
    (item: departmentLoadTypes.DepartmentLoadData) => ({
      ...item,
      displayName: item.name[locale as "ru" | "kz"],
    })
  );

  return (
    <StateWrapper title={t("title")}>
      <DepartmentLoadChart data={chartData} />
    </StateWrapper>
  );
};
