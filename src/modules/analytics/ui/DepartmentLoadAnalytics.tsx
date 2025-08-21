"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { useGetDepartmentLoads } from "@/modules/analytics/application/use-cases";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";

// Конфигурация графика
const chartConfig = {
  count: {
    label: "Количество",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export const DepartmentLoadAnalytics = () => {
  const { data, isLoading, isError } = useGetDepartmentLoads();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="pl-4 text-2xl">Нагрузка на отделы</CardTitle>
        </CardHeader>
        <CardContent>Загрузка...</CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="pl-4 text-2xl">Нагрузка на отделы</CardTitle>
        </CardHeader>
        <CardContent>Ошибка при загрузке данных</CardContent>
      </Card>
    );
  }

  // Маппим данные: добавляем displayName для графика
  const chartData = data.map((item) => ({
    ...item,
    displayName: item.name.ru,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="pl-4 text-2xl">Нагрузка на отделы</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} style={{ height: 280 }}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
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
              radius={4}
              barSize={40}
            >
              {/* Название отдела слева */}
              <LabelList
                dataKey="displayName"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={16}
              />
              {/* Количество справа */}
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={16}
              />
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={16}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
