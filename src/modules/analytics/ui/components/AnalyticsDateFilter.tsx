"use client";

import { Calendar, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { useAnalyticsDateStore } from "../../domain/stores/analytics-date.store";

export const AnalyticsDateFilter = () => {
  const { selectedDate, setSelectedDate, clearDate } = useAnalyticsDateStore();
  const t = useTranslations("analytics.dateFilter");
  const locale = useLocale();

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
          {t("label")}:
        </span>
      </div>

      <Input
        type="date"
        value={selectedDate || ""}
        onChange={handleDateChange}
        className="w-40"
        placeholder={t("placeholder")}
      />

      {selectedDate && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearDate}
          className="flex items-center space-x-1"
        >
          <X className="h-3 w-3" />
          <span>{t("clear")}</span>
        </Button>
      )}

      {selectedDate && (
        <span className="text-sm text-gray-500">
          {t("showFor")}:{" "}
          {new Date(selectedDate).toLocaleDateString(
            locale === "kz" ? "kk-KZ" : "ru-RU"
          )}
        </span>
      )}
    </div>
  );
};
