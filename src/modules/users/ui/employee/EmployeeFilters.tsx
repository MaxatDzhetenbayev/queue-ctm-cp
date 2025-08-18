import React from "react";

import { DepartmentType, ServiceType } from "../../domain/schemas";

interface EmployeeFiltersProps {
  selectedDepartment: string | null;
  selectedService: string | null;
  setPathParams: (key: "department" | "service", value: string) => void;
  departments: DepartmentType[] | undefined;
  services: ServiceType[] | undefined;
}

export const EmployeeFilters = ({
  selectedDepartment,
  selectedService,
  setPathParams,
  departments,
  services,
}: EmployeeFiltersProps) => {
  return (
    <>
      <select
        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={selectedDepartment ?? ""}
        onChange={(e) => setPathParams("department", e.target.value)}
      >
        <option value="">Все отделы</option>
        {departments?.map((dept) => (
          <option key={dept.id} value={dept.id}>
            {dept.name.ru}
          </option>
        ))}
      </select>
      <select
        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={selectedService ?? ""}
        onChange={(e) => setPathParams("service", e.target.value)}
      >
        <option value="">Все услуги</option>
        {services?.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name.ru}
          </option>
        ))}
      </select>
    </>
  );
};
