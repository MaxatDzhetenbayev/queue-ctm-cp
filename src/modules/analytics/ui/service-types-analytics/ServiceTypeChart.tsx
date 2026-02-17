"use client";

import { useRouter } from "next/navigation";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { useLocale, useTranslations } from "next-intl";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

import { serviceTypesConfig } from "../../domain/configs";
import { serviceTypesTypes } from "../../domain/types";

interface ServiceTypeChartProps {
  data: serviceTypesTypes.ServiceTypeData[];
  activeService: string;
  chartConfig: ChartConfig;
  chartId: string;
}

export const ServiceTypeChart = ({
  data,
  activeService,
  chartConfig,
  chartId,
}: ServiceTypeChartProps) => {
  const router = useRouter();
  const t = useTranslations("analytics.serviceTypes");
  const locale = useLocale();
  const {
    innerRadius,
    strokeWidth,
    maxWidth,
    activeRadiusIncrease,
    activeInnerRadiusIncrease,
    activeOuterRadiusIncrease,
  } = serviceTypesConfig.MAIN_CONFIG.chart;

  const chartData = data.map((item, index) => ({
    ...item,
    displayName: item.name[locale as "ru" | "kz"],
    fill: `var(--chart-${index + 1})`,
  }));

  const activeIndex = chartData.findIndex(
    (item) => item.displayName === activeService
  );

  return (
    <ChartContainer
      id={chartId}
      config={chartConfig}
      className={`mx-auto aspect-square w-full max-w-[${maxWidth}px] h-[${maxWidth}px]`}
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          className="cursor-pointer"
          data={chartData}
          dataKey="count"
          nameKey="displayName"
          innerRadius={innerRadius}
          strokeWidth={strokeWidth}
          activeIndex={activeIndex}
          onClick={() =>
            router.push(`admin/employee?service=${data[activeIndex].id}`)
          }
          activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
            <g>
              <Sector
                {...props}
                outerRadius={outerRadius + activeRadiusIncrease}
              />
              <Sector
                {...props}
                outerRadius={outerRadius + activeOuterRadiusIncrease}
                innerRadius={outerRadius + activeInnerRadiusIncrease}
              />
            </g>
          )}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    onClick={() =>
                      router.push(
                        `admin/employee?service=${data[activeIndex].id}`
                      )
                    }
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {data[activeIndex].count.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      {t("services")}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};
