"use client";

import { Filter } from "lucide-react";
import React from "react";

import { STATUS_LABELS } from "@/modules/receptions/domain/constants/status.constants";
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

const statusOptions: { value: ReceptionStatusType; label: string }[] = [
  { value: "PENDING", label: STATUS_LABELS.PENDING },
  { value: "CALLED", label: STATUS_LABELS.CALLED },
  { value: "WORKING", label: STATUS_LABELS.WORKING },
  { value: "DONE", label: STATUS_LABELS.DONE },
  { value: "NO_SHOW", label: STATUS_LABELS.NO_SHOW },
  { value: "CANCELED", label: STATUS_LABELS.CANCELED },
];

export const ReceptionStatusFilter: React.FC<ReceptionStatusFilterProps> = ({
  selectedStatus,
}) => {
  const selectedLabel = selectedStatus
    ? statusOptions.find((option) => option.value === selectedStatus)?.label
    : "Все статусы";

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
          Все статусы
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
