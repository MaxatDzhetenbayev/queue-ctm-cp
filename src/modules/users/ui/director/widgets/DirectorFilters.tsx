"use client";

import { useTranslations } from "next-intl";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface DirectorFiltersProps {
  selectedStatus: string | null;
  setPathParams: (key: "status", value: string) => void;
}

export const DirectorFilters = ({
  selectedStatus,
  setPathParams,
}: DirectorFiltersProps) => {
  const t = useTranslations("director.filters");
  return (
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
  );
};
