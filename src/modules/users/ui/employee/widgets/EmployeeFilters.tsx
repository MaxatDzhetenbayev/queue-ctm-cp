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
  selectedStatus?: string | null;
  setPathParams: (
    key: "department" | "service" | "status",
    value: string
  ) => void;
  departments: DepartmentType[] | undefined;
  services: ServiceType[] | undefined;
}

export const EmployeeFilters = ({
  selectedDepartment,
  selectedService,
  selectedStatus,
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
          <SelectValue placeholder="Выберите сервис" />
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
      <Select
        value={selectedStatus ?? ""}
        onValueChange={(value) => setPathParams("status", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Выберите статус" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Все статусы</SelectLabel>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="ACTIVE">Активные</SelectItem>
            <SelectItem value="ARCHIVED">Архив</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
