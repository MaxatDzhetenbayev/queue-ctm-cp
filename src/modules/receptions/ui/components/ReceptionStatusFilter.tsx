"use client";

import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

import { ReceptionStatusType } from "@/modules/receptions/domain/schemas/reception.schemas";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { useReceptionFiltersStore } from "../../domain/stores";

interface ReceptionStatusFilterProps {
  selectedStatus: string | null;
}

export const ReceptionStatusFilter: React.FC<ReceptionStatusFilterProps> = ({
  selectedStatus,
}) => {
  const t = useTranslations("common.status");
  const tReceptions = useTranslations("receptions.status");
  
  const statusOptions: { value: ReceptionStatusType; label: string }[] = [
    { value: "PENDING", label: t("pending") },
    { value: "CALLED", label: t("called") },
    { value: "WORKING", label: t("working") },
    { value: "DONE", label: t("done") },
    { value: "NO_SHOW", label: t("noShow") },
    { value: "CANCELED", label: t("canceled") },
  ];

  const selectedLabel = selectedStatus
    ? statusOptions.find((option) => option.value === selectedStatus)?.label
    : tReceptions("all");

  const setSelectedStatus = useReceptionFiltersStore(
    (state) => state.setSelectedStatus
  );

  const handleStatusChange = (status: string | null) => {
    setSelectedStatus(status);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-start">
          <Filter className="mr-2 h-4 w-4" />
          {selectedLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => handleStatusChange(null)}>
          {tReceptions("all")}
        </DropdownMenuItem>
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
