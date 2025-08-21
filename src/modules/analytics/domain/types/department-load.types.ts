import { LocaleRecordType } from "@/shared/types";
export interface DepartmentLoadData {
  id: string;
  name: LocaleRecordType<string>;
  count: number;
  percentage: number;
}

export interface ChartDataItem extends DepartmentLoadData {
  displayName: string;
}
