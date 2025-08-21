import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { serviceTypesConfig } from "../../domain/configs";
import { serviceTypesTypes } from "../../domain/types";

interface ServiceTypeSelectProps {
  data: serviceTypesTypes.ServiceTypeData[];
  activeService: string;
  onServiceChange: (value: string) => void;
  chartConfig: Record<string, { label?: React.ReactNode; color?: string }>;
}

export const ServiceTypeSelect = ({
  data,
  activeService,
  onServiceChange,
  chartConfig,
}: ServiceTypeSelectProps) => {
  const {
    placeholder,
    triggerClass,
    contentClass,
    itemClass,
    colorIndicatorClass,
  } = serviceTypesConfig.MAIN_CONFIG.select;

  return (
    <Select value={activeService} onValueChange={onServiceChange}>
      <SelectTrigger className={triggerClass} aria-label="Select service">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent align="end" className={contentClass}>
        {data.map((item) => {
          const config = chartConfig[item.name.ru];
          if (!config) return null;

          return (
            <SelectItem
              key={item.name.ru}
              value={item.name.ru}
              className={itemClass}
            >
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={colorIndicatorClass}
                  style={{
                    backgroundColor:
                      config.color ||
                      serviceTypesConfig.chartConfig.defaultColor,
                  }}
                />
                {config.label || item.name.ru}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
