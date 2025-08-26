"use client";

import { Clock, Eye, FileText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

import { CreateDepartmentType } from "../../domain/schemas";
import { getHoursFromToHourEnd } from "../../domain/utils/time.utils";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface DepartmentFeaturesControlProps {
  control: Control<CreateDepartmentType>;
  setFormValue: UseFormSetValue<CreateDepartmentType>;
  features?: { [key: string]: string } | null;
}

export const DepartmentFeaturesControl = ({
  control,
  setFormValue,
  features = null,
}: DepartmentFeaturesControlProps) => {
  const timeSlots = getHoursFromToHourEnd("09:00", "18:30");
  const [departmentFeatures, setDepartmentFeatures] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    setFormValue("departmentFeatures", departmentFeatures);
  }, [departmentFeatures, setFormValue]);

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("");
  const [isShowDepartment, setIsShowDepartment] = useState(false);
  const [isLetterDepartment, setIsLetterDepartment] = useState(false);

  useEffect(() => {
    if (features) {
      setDepartmentFeatures(features);
      setStartTime(features.TIME?.split("-")[0] || "09:00");
      setEndTime(features.TIME?.split("-")[1] || "");
      setIsShowDepartment(Boolean(features.SHOW === "true"));
      setIsLetterDepartment(Boolean(features.LETTER === "true"));
    }
  }, [features]);

  useEffect(() => {
    if (startTime && endTime) {
      const time = `${startTime}-${endTime}`;
      setDepartmentFeatures((prev) => ({ ...prev, TIME: time }));
    }
  }, [startTime, endTime]);

  useEffect(() => {
    setDepartmentFeatures((prev) => ({
      ...prev,
      SHOW: String(isShowDepartment),
    }));
  }, [isShowDepartment]);

  useEffect(() => {
    setDepartmentFeatures((prev) => ({
      ...prev,
      LETTER: String(isLetterDepartment),
    }));
  }, [isLetterDepartment]);

  return (
    <div className="space-y-4">
      {/* Временные слоты */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Начальное время
          </Label>
          <Select value={startTime} onValueChange={setStartTime}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите время" />
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
            Конечное время
          </Label>
          <Select value={endTime} onValueChange={setEndTime}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите время" />
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
            onCheckedChange={setIsShowDepartment}
          />
          <Label
            htmlFor="showDepartment"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Eye className="h-4 w-4" />
            Показывать отдел в базе телеграм
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="letterDepartment"
            checked={isLetterDepartment}
            onCheckedChange={setIsLetterDepartment}
          />
          <Label
            htmlFor="letterDepartment"
            className="flex items-center gap-2 cursor-pointer"
          >
            <FileText className="h-4 w-4" />
            Принимать людей по алфавиту (по буквам) в телеграмме
          </Label>
        </div>
      </div>
    </div>
  );
};
