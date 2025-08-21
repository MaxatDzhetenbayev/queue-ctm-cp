"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

import { departmentLoadConfig } from "../../domain/configs";
import { departmentLoadTypes } from "../../domain/types";

interface DepartmentLoadChartProps {
  data: departmentLoadTypes.ChartDataItem[];
}

export const DepartmentLoadChart = ({ data }: DepartmentLoadChartProps) => {
  const { height, barSize, radius, margin, fontSize, offset } =
    departmentLoadConfig.MAIN_CONFIG.chart;

  return (
    <ChartContainer
      config={departmentLoadConfig.chartConfig as ChartConfig}
      style={{ height }}
    >
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={margin}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="displayName"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <XAxis dataKey="count" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey="count"
          layout="vertical"
          fill="var(--color-count)"
          radius={radius}
          barSize={barSize}
        >
          <LabelList
            dataKey="displayName"
            position="insideLeft"
            offset={offset}
            className="fill-(--color-label)"
            fontSize={fontSize}
          />
          <LabelList
            dataKey="count"
            position="right"
            offset={offset}
            className="fill-foreground"
            fontSize={fontSize}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
