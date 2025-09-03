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

interface AdminReceptionsFilterProps {
  selectedReceptionDate: string | null;
  selectedReceptionStatus: string | null;
  selectedAuthType: string | null;
  setPathParams: {
    receptionDate: (value: string) => void;
    receptionStatus: (value: string) => void;
    authType: (value: string) => void;
  };
}

const authTypeOptions = [
  { value: "TELEGRAM", label: "По Telegram" },
  { value: "OFFLINE", label: "Создание через менеджера" },
];

export const AdminReceptionsFilter = ({
  selectedReceptionDate,
  selectedReceptionStatus,
  selectedAuthType,
  setPathParams,
}: AdminReceptionsFilterProps) => {
  return (
    <>
      <Input
        type="date"
        value={selectedReceptionDate ?? ""}
        onChange={(e) => setPathParams.receptionDate(e.target.value)}
      />
      <Select
        value={selectedReceptionStatus ?? ""}
        onValueChange={(value) => setPathParams.receptionStatus(value)}
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
      <Select
        value={selectedAuthType ?? ""}
        onValueChange={(value) => setPathParams.authType(value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Тип авторизации" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Все типы</SelectLabel>
            <SelectItem value="all">Все типы</SelectItem>
            {authTypeOptions.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
