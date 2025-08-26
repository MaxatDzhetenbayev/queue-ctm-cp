import React from "react";

import { DepartmentType } from "@/modules/departments/domain/schemas";
import { ServiceType } from "@/modules/users/domain/schemas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

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
      <Select
        value={selectedDepartment ?? ""}
        onValueChange={(value) => setPathParams("department", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Выберите отдел" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Все отделы</SelectLabel>
            <SelectItem value="all">Все отделы</SelectItem>
            {departments?.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name.ru}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={selectedService ?? ""}
        onValueChange={(value) => setPathParams("service", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Выберите отдел" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Все сервисы</SelectLabel>
            <SelectItem value="all">Все сервисы</SelectItem>
            {services?.map((service) => (
              <SelectItem key={service.id} value={service.id}>
                {service.name.ru}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
