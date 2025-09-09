"use client";

import { useRouter } from "next/navigation";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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
  const {
    innerRadius,
    strokeWidth,
    maxWidth,
    aspectRatio,
    activeRadiusIncrease,
    activeInnerRadiusIncrease,
    activeOuterRadiusIncrease,
  } = serviceTypesConfig.MAIN_CONFIG.chart;
  const { services } = serviceTypesConfig.MAIN_CONFIG.messages;

  const activeIndex = data.findIndex((item) => item.name.ru === activeService);

  const chartData = data.map((item, index) => ({
    ...item,
    fill: `var(--chart-${index + 1})`,
  }));

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
          nameKey="name.ru"
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
                      {services}
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
