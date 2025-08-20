"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

import { useGetActivityAnalytics } from "../application/use-cases/get-analytics-activity";

const chartData = [
  { date: "2024-06-01", activeEmployees: 12, records: 35 },
  { date: "2024-06-02", activeEmployees: 15, records: 52 },
  { date: "2024-06-03", activeEmployees: 10, records: 28 },
  { date: "2024-06-04", activeEmployees: 17, records: 61 },
  { date: "2024-06-05", activeEmployees: 8, records: 22 },
  { date: "2024-06-06", activeEmployees: 14, records: 43 },
  { date: "2024-06-07", activeEmployees: 16, records: 55 },
  { date: "2024-06-08", activeEmployees: 13, records: 47 },
  { date: "2024-06-09", activeEmployees: 18, records: 64 },
  { date: "2024-06-10", activeEmployees: 11, records: 31 },
  { date: "2024-06-11", activeEmployees: 9, records: 26 },
  { date: "2024-06-12", activeEmployees: 19, records: 70 },
  { date: "2024-06-13", activeEmployees: 15, records: 50 },
  { date: "2024-06-14", activeEmployees: 17, records: 62 },
];

const chartConfig = {
  records: {
    label: "Количество записей",
    color: "var(--color-chart-7)",
  },
} satisfies ChartConfig;

export const ActivityAnalytics = () => {
  const { data, isLoading } = useGetActivityAnalytics();

  return (
    <Card className="">
      <CardHeader className="flex flex-col items-stretch border-b p-0 sm:flex-row">
        <CardTitle className="pl-4 text-2xl">График активности</CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("ru-RU", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[180px]"
                    formatter={(_, __, item) => (
                      <>
                        <div>
                          📑 Записи за этот день: <b>{item.payload.count}</b>
                        </div>
                        {/* <div>
                          👥 Актив. сотрудники:{" "}
                          <b>{item.payload.activeEmployees}</b>
                        </div> */}
                      </>
                    )}
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("ru-RU", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar dataKey="count" fill={chartConfig.records.color} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
