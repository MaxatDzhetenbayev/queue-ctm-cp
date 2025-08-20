"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import { useGetServiceTypeCount } from "@/modules/analytics/application/use-cases/get-analytics-service-type-counts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export const ServiceTypesAnalytics = () => {
  const router = useRouter();
  const { data } = useGetServiceTypeCount();
  const id = "pie-interactive";

  const [activeService, setActiveService] = useState<string>("");

  if (!data || data.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-10">
        <span className="text-muted-foreground">Нет данных</span>
      </Card>
    );
  }

  if (activeService === "" && data && data.length > 0) {
    setActiveService(data[0].name.ru);
  }

  const activeIndex = data.findIndex((item) => item.name.ru === activeService);

  // Генерация chartConfig на основе данных
  const chartConfig: ChartConfig = data.reduce((acc, item, index) => {
    acc[item.name.ru] = {
      label: item.name.ru,
      color: `var(--chart-${index + 1})`,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle className="pl-4 text-2xl">Типы услуг</CardTitle>
        </div>
        <Select value={activeService} onValueChange={setActiveService}>
          <SelectTrigger
            className="ml-auto h-7 w-[180px] rounded-lg pl-2.5"
            aria-label="Select service"
          >
            <SelectValue placeholder="Выберите тип" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {data.map((item) => {
              const config = chartConfig[item.name.ru];
              if (!config) return null;

              return (
                <SelectItem
                  key={item.name.ru}
                  value={item.name.ru}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{
                        backgroundColor: config.color,
                      }}
                    />
                    {config.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              className="cursor-pointer"
              data={data.map((item, index) => ({
                ...item,
                fill: `var(--chart-${index + 1})`,
              }))}
              dataKey="count"
              nameKey="name.ru"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              onClick={() =>
                router.push(`admin/employee?service=${data[activeIndex].id}`)
              }
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
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
                          Услуги
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
