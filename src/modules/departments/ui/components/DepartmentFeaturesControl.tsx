"use client";

import { Clock, Eye, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { Control } from "react-hook-form";

import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { CreateDepartmentType } from "../../domain/schemas";
import { useDepartmentFormStore } from "../../domain/stores";
import { getHoursFromToHourEnd } from "../../domain/utils/time.utils";

interface DepartmentFeaturesControlProps {
  control: Control<CreateDepartmentType>;
  features?: { [key: string]: string } | null;
}

export const DepartmentFeaturesControl = ({
  features = null,
}: DepartmentFeaturesControlProps) => {
  const t = useTranslations("departments.create");
  const timeSlots = getHoursFromToHourEnd("09:00", "18:30");

  const {
    startTime,
    endTime,
    isShowDepartment,
    isLetterDepartment,
    setDepartmentFeatures,
    setStartTime,
    setEndTime,
    updateTimeFeature,
    updateShowFeature,
    updateLetterFeature,
  } = useDepartmentFormStore();

  // Инициализация состояния из пропсов
  useEffect(() => {
    if (features) {
      setDepartmentFeatures(features);
      setStartTime(features.TIME?.split("-")[0] || "09:00");
      setEndTime(features.TIME?.split("-")[1] || "");
      updateShowFeature(Boolean(features.SHOW === "true"));
      updateLetterFeature(Boolean(features.LETTER === "true"));
    }
  }, [
    features,
    setDepartmentFeatures,
    setStartTime,
    setEndTime,
    updateShowFeature,
    updateLetterFeature,
  ]);

  // Обновление времени при изменении startTime или endTime
  useEffect(() => {
    if (startTime && endTime) {
      updateTimeFeature(startTime, endTime);
    }
  }, [startTime, endTime, updateTimeFeature]);

  const handleShowDepartmentChange = (checked: boolean | "indeterminate") => {
    updateShowFeature(checked === true);
  };

  const handleLetterDepartmentChange = (checked: boolean | "indeterminate") => {
    updateLetterFeature(checked === true);
  };

  return (
    <div className="space-y-4">
      {/* Временные слоты */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {t("startTime")}
          </Label>
          <Select value={startTime} onValueChange={setStartTime}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectTime")} />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="endTime" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {t("endTime")}
          </Label>
          <Select value={endTime} onValueChange={setEndTime}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectTime")} />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Чекбоксы */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showDepartment"
            checked={isShowDepartment}
            onCheckedChange={handleShowDepartmentChange}
          />
          <Label
            htmlFor="showDepartment"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Eye className="h-4 w-4" />
            {t("showInTelegram")}
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="letterDepartment"
            checked={isLetterDepartment}
            onCheckedChange={handleLetterDepartmentChange}
          />
          <Label
            htmlFor="letterDepartment"
            className="flex items-center gap-2 cursor-pointer"
          >
            <FileText className="h-4 w-4" />
            {t("acceptByAlphabet")}
          </Label>
        </div>
      </div>
    </div>
  );
};
