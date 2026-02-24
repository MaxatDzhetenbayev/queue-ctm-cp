"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { Clock, Eye } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { getHoursFromToHourEnd } from "@/modules/departments/domain/utils/time.utils";

export type DepartmentFeaturesForm = {
  showInTelegram: boolean;
  startTime: string;
  endTime: string;
};

function featuresToForm(features?: { type: string; value: string }[] | null): DepartmentFeaturesForm {
  const map = new Map(
    (features || []).map((f) => [f.type, f.value])
  );
  const time = map.get("TIME")?.split("-") ?? ["09:00", "18:00"];
  return {
    showInTelegram: map.get("SHOW") === "true",
    startTime: time[0] || "09:00",
    endTime: time[1] || "18:00",
  };
}

function formToFeatures(form: DepartmentFeaturesForm): { [key: string]: string } {
  const result: { [key: string]: string } = {
    SHOW: form.showInTelegram ? "true" : "false",
  };
  if (form.startTime && form.endTime) {
    result.TIME = `${form.startTime}-${form.endTime}`;
  }
  return result;
}

const timeSlots = getHoursFromToHourEnd("09:00", "18:30");

interface DepartmentFeaturesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  initialFeatures?: { type: string; value: string }[] | null;
  submitLabel: string;
  onSubmit: (features: { [key: string]: string }) => void;
  isSubmitting?: boolean;
}

export function DepartmentFeaturesModal({
  open,
  onOpenChange,
  title,
  initialFeatures,
  submitLabel,
  onSubmit,
  isSubmitting = false,
}: DepartmentFeaturesModalProps) {
  const t = useTranslations("departments.create");
  const tCommon = useTranslations("common.buttons");
  const [form, setForm] = useState<DepartmentFeaturesForm>(() =>
    featuresToForm(initialFeatures)
  );

  useEffect(() => {
    if (open) {
      setForm(featuresToForm(initialFeatures));
    }
  }, [open, initialFeatures]);

  const handleSubmit = () => {
    onSubmit(formToFeatures(form));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {t("startTime")}
              </Label>
              <Select
                value={form.startTime}
                onValueChange={(v) => setForm((prev) => ({ ...prev, startTime: v }))}
              >
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
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {t("endTime")}
              </Label>
              <Select
                value={form.endTime}
                onValueChange={(v) => setForm((prev) => ({ ...prev, endTime: v }))}
              >
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
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showInTelegram"
              checked={form.showInTelegram}
              onCheckedChange={(checked) =>
                setForm((prev) => ({
                  ...prev,
                  showInTelegram: checked === true,
                }))
              }
            />
            <Label
              htmlFor="showInTelegram"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Eye className="h-4 w-4" />
              {t("showInTelegram")}
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            {tCommon("cancel")}
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "..." : submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
