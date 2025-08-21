"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { receptionsAuthTypeConfig } from "../../domain/configs";
import { receptionsAuthTypeTypes } from "../../domain/types";

interface ReceptionsAuthTypeSelectProps {
  data: receptionsAuthTypeTypes.ReceptionsAuthTypeChartData[];
  activeType: string;
  onTypeChange: (value: string) => void;
  chartConfig: Record<string, { label?: React.ReactNode; color?: string }>;
}

export const ReceptionsAuthTypeSelect = ({
  data,
  activeType,
  onTypeChange,
  chartConfig,
}: ReceptionsAuthTypeSelectProps) => {
  const {
    placeholder,
    triggerClass,
    contentClass,
    itemClass,
    colorIndicatorClass,
  } = receptionsAuthTypeConfig.MAIN_CONFIG.select;

  return (
    <Select value={activeType} onValueChange={onTypeChange}>
      <SelectTrigger className={triggerClass} aria-label="Select auth type">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent align="end" className={contentClass}>
        {data.map((item) => {
          const config = chartConfig[item.name];
          if (!config) return null;

          return (
            <SelectItem key={item.name} value={item.name} className={itemClass}>
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={colorIndicatorClass}
                  style={{
                    backgroundColor:
                      config.color ||
                      receptionsAuthTypeConfig.chartConfig.defaultColor,
                  }}
                />
                {config.label || item.label}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
