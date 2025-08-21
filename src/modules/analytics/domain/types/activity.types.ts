export interface ActivityData {
  date: string;
  count: number;
  activeEmployees?: number;
}

export interface ActivityChartData extends ActivityData {
  formattedDate: string;
}
