import { LocaleRecordType } from "@/shared/types";

export interface ServiceTypeData {
  id: string;
  name: LocaleRecordType<string>;
  count: number;
}

export interface ServiceTypeChartData extends ServiceTypeData {
  fill: string;
}

export interface ServiceTypeSelectProps {
  data: ServiceTypeData[];
  activeService: string;
  onServiceChange: (value: string) => void;
  chartConfig: Record<string, { label: string; color: string }>;
}
