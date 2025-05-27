export interface IDepartment {
  id: string;
  name: { [key: string]: string };
  employeesСount: number;
  onlineEmployeesCount: number;
  clientServedCount: number;
  telegramClient: number;
  offlineClient: number;
  avgServiceTime: string;
  avgLoadTime: string;
}
