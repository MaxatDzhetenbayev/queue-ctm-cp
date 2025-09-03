"use client";

import { Calendar, X } from "lucide-react";
import React from "react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { useAnalyticsDateStore } from "../../domain/stores/analytics-date.store";

export const AnalyticsDateFilter = () => {
  const { selectedDate, setSelectedDate, clearDate } = useAnalyticsDateStore();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date || null);
  };

  const handleClearDate = () => {
    clearDate();
  };

  return (
    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          Фильтр по дате:
        </span>
      </div>

      <Input
        type="date"
        value={selectedDate || ""}
        onChange={handleDateChange}
        className="w-40"
        placeholder="Выберите дату"
      />

      {selectedDate && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearDate}
          className="flex items-center space-x-1"
        >
          <X className="h-3 w-3" />
          <span>Очистить</span>
        </Button>
      )}

      {selectedDate && (
        <span className="text-sm text-gray-500">
          Показать данные за:{" "}
          {new Date(selectedDate).toLocaleDateString("ru-RU")}
        </span>
      )}
    </div>
  );
};
