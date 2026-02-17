"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useLocale, useTranslations } from "next-intl";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

import { activityConfig } from "../../domain/configs";
import { activityTypes } from "../../domain/types";

interface ActivityChartProps {
  data: activityTypes.ActivityData[];
  chartConfig: ChartConfig;
}

export const ActivityChart = ({ data, chartConfig }: ActivityChartProps) => {
  const { height, margin, tooltipWidth } = activityConfig.MAIN_CONFIG.chart;
  const { tooltip: tooltipFormat, axis: axisFormat } =
    activityConfig.MAIN_CONFIG.dateFormat;
  const locale = useLocale();
  const t = useTranslations("analytics.activity");

  return (
    <ChartContainer
      config={chartConfig}
      className={`aspect-auto h-[${height}px] w-full`}
    >
      <BarChart accessibilityLayer data={data} margin={margin}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString(
              locale === "kz" ? "kk-KZ" : "ru-RU",
              axisFormat
            );
          }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className={`w-[${tooltipWidth}px]`}
              formatter={(_, __, item) => (
                <>
                  <div>
                    📑 {t("recordsPerDay")} <b>{item.payload.count}</b>
                  </div>
                </>
              )}
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString(
                    locale === "kz" ? "kk-KZ" : "ru-RU",
                    tooltipFormat
                  );
              }}
            />
          }
        />
        <Bar dataKey="count" fill={activityConfig.chartConfig.records.color} />
      </BarChart>
    </ChartContainer>
  );
};
