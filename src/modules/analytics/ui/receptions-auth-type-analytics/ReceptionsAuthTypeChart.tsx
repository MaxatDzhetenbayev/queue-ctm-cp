"use client";

import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

import { receptionsAuthTypeConfig } from "../../domain/configs";
import { receptionsAuthTypeTypes } from "../../domain/types";

interface ReceptionsAuthTypeChartProps {
  data: receptionsAuthTypeTypes.ReceptionsAuthTypeChartData[];
  activeType: string;
  chartConfig: ChartConfig;
  chartId: string;
}

export const ReceptionsAuthTypeChart = ({
  data,
  activeType,
  chartConfig,
  chartId,
}: ReceptionsAuthTypeChartProps) => {
  const {
    innerRadius,
    strokeWidth,
    maxWidth,
    aspectRatio,
    activeRadiusIncrease,
    activeInnerRadiusIncrease,
    activeOuterRadiusIncrease,
  } = receptionsAuthTypeConfig.MAIN_CONFIG.chart;
  const { receptions } = receptionsAuthTypeConfig.MAIN_CONFIG.messages;

  const activeIndex = data.findIndex((item) => item.name === activeType);

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
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={innerRadius}
          strokeWidth={strokeWidth}
          activeIndex={activeIndex}
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
                      {data[activeIndex]?.value.toLocaleString() || 0}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      {receptions}
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
