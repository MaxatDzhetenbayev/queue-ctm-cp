"use client";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar } from "lucide-react";
import React from "react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/lib/utils";

import { useReceptionFiltersStore } from "../../domain/stores";

interface ReceptionDateFilterProps {
  selectedDate: string | null;
}

export const ReceptionDateFilter: React.FC<ReceptionDateFilterProps> = ({
  selectedDate,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const setSelectedDate = useReceptionFiltersStore(
    (state) => state.setSelectedDate
  );

  const handleDateChange = (date: string) => {
    setSelectedDate(date || null);
  };

  const handleTodayClick = () => {
    setSelectedDate(today);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {selectedDate
            ? format(new Date(selectedDate), "PPP", { locale: ru })
            : "Выберите дату"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-3">
          <Input
            type="date"
            value={selectedDate || today}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleTodayClick}
            className="w-full"
          >
            Сегодня
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
