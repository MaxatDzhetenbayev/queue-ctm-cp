import React from "react";

import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { statusOptions } from "@/shared/consts";

interface EmployeeReceptionsFilterProps {
  selectedReceptionDate: string | null;
  selectedReceptionStatus: string | null;
  setPathParams: (
    key: "receptionDate" | "receptionStatus",
    value: string
  ) => void;
}

export const EmployeeReceptionsFilter = ({
  selectedReceptionDate,
  selectedReceptionStatus,
  setPathParams,
}: EmployeeReceptionsFilterProps) => {
  return (
    <>
      <Input
        type="date"
        value={selectedReceptionDate ?? ""}
        onChange={(e) => setPathParams("receptionDate", e.target.value)}
      />
      <Select
        value={selectedReceptionStatus ?? ""}
        onValueChange={(value) => setPathParams("receptionStatus", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Выберите статус" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Все статусы</SelectLabel>
            <SelectItem value="all">Все статусы</SelectItem>
            {statusOptions?.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
