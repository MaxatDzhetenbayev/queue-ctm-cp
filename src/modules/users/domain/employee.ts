import { EmployeeOneType, EmployeeType } from "./schemas";

/**
 * Конструктор класса Employee.
 * @param {EmployeeType} employee - Данные сотрудника.
 */
export class Employee implements EmployeeType {
  /**
   * Конструктор класса Employee.
   * @param {EmployeeOneType[]} managers - Список менеджеров.
   * @param {number} total - Общее количество сотрудников.
   */
  constructor(public managers: EmployeeOneType[], public total: number) {
    this.managers = managers;
    this.total = total;
  }
}
