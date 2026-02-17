"use client";

import { useLocale,useTranslations } from "next-intl";
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
  const locale = useLocale();
  const t = useTranslations("employee.filters");
  const tForm = useTranslations("employee.form");
  
  return (
    <>
      <Select
        value={selectedDepartment ?? ""}
        onValueChange={(value) => setPathParams("department", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={tForm("selectDepartment")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t("allDepartments")}</SelectLabel>
            <SelectItem value="all">{t("allDepartments")}</SelectItem>
            {departments?.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name[locale as "ru" | "kz"]}
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
          <SelectValue placeholder={tForm("selectServices")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t("allServices")}</SelectLabel>
            <SelectItem value="all">{t("allServices")}</SelectItem>
            {services?.map((service) => (
              <SelectItem key={service.id} value={service.id}>
                {service.name[locale as "ru" | "kz"]}
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
          <SelectValue placeholder={t("allStatuses")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t("allStatuses")}</SelectLabel>
            <SelectItem value="all">{t("allStatuses")}</SelectItem>
            <SelectItem value="ACTIVE">{t("active")}</SelectItem>
            <SelectItem value="ARCHIVED">{t("archived")}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
