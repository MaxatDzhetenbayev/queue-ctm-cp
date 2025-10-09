"use client";

import { Calendar, CheckCircle, FileText, User } from "lucide-react";
import React, { useState } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";

import { useCreateAbsence } from "../../application/use-cases";
import { CreateAbsenceType } from "../../domain/schemas/absences.schemas";

interface Employee {
  id: string;
  name: string;
}

interface CreateAbsenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
}

interface AbsenceFormData {
  employeeId: string;
  type: "HOLIDAY" | "SICK_LEAVE" | "PERSONAL";
  comment: string;
  startDate: string;
  endDate: string;
}

export const CreateAbsenceModal = ({
  isOpen,
  onClose,
  employees,
}: CreateAbsenceModalProps) => {
  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [formData, setFormData] = useState<AbsenceFormData>({
    employeeId: "",
    type: "HOLIDAY",
    comment: "",
    startDate: "",
    endDate: "",
  });

  const createAbsenceMutation = useCreateAbsence(formData.employeeId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "form") {
      setStep("confirmation");
    } else {
      if (!formData.employeeId) {
        alert("Выберите сотрудника");
        return;
      }

      const startDateISO = new Date(
        formData.startDate + "T00:00:00.000Z"
      ).toISOString();
      const endDateISO = formData.endDate
        ? new Date(formData.endDate + "T23:59:59.999Z").toISOString()
        : undefined;

      const absenceData: CreateAbsenceType = {
        startDate: startDateISO,
        endDate: endDateISO,
        type: formData.type,
        comment: formData.comment || undefined,
      };

      await createAbsenceMutation.mutateAsync(absenceData);
      handleClose();
    }
  };

  const handleClose = () => {
    setStep("form");
    setFormData({
      employeeId: "",
      type: "HOLIDAY",
      comment: "",
      startDate: "",
      endDate: "",
    });
    onClose();
  };

  const selectedEmployee = employees.find(
    (emp) => emp.id === formData.employeeId
  );

  const absenceTypes = [
    { id: "HOLIDAY", label: "Отпуск", color: "bg-blue-500" },
    { id: "SICK_LEAVE", label: "Больничный", color: "bg-red-500" },
    { id: "PERSONAL", label: "Отгул", color: "bg-yellow-500" },
  ];

  const selectedType = absenceTypes.find((type) => type.id === formData.type);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vacation":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "sick_leave":
        return "bg-red-100 text-red-800 border-red-200";
      case "personal":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {step === "form" ? (
              <>
                <Calendar className="h-5 w-5" />
                <span>Создать отсутствие</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Подтверждение</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === "form" ? (
            <>
              {/* Выбор сотрудника */}
              <div className="space-y-2">
                <Label
                  htmlFor="employee"
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Сотрудник *</span>
                </Label>
                <Select
                  value={formData.employeeId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, employeeId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите сотрудника" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Выбор типа отсутствия */}
              <div className="space-y-2">
                <Label htmlFor="type" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Тип отсутствия *</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      type: value as "HOLIDAY" | "SICK_LEAVE" | "PERSONAL",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип отсутствия" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HOLIDAY">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span>Отпуск</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="SICK_LEAVE">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span>Больничный</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="PERSONAL">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span>Отгул</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Даты отсутствия */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Дата начала *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Дата окончания *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    min={
                      formData.startDate ||
                      new Date().toISOString().split("T")[0]
                    }
                    required
                  />
                </div>
              </div>

              {/* Комментарий */}
              <div className="space-y-2">
                <Label htmlFor="comment">Комментарий (необязательно)</Label>
                <Textarea
                  id="comment"
                  placeholder="Введите комментарий к отсутствию..."
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </>
          ) : (
            /* Экран подтверждения */
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">
                  Проверьте данные:
                </h4>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <span className="text-sm text-gray-600">Сотрудник:</span>
                      <p className="font-medium">{selectedEmployee?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <div>
                      <span className="text-sm text-gray-600">
                        Тип отсутствия:
                      </span>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(formData.type)}>
                          {selectedType?.label}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <span className="text-sm text-gray-600">Период:</span>
                      <p className="font-medium">
                        {formatDate(formData.startDate)} -{" "}
                        {formatDate(formData.endDate)}
                      </p>
                    </div>
                  </div>

                  {formData.comment && (
                    <div className="flex items-start space-x-3">
                      <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-600">
                          Комментарий:
                        </span>
                        <p className="text-sm">{formData.comment}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Кнопки */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={step === "form" ? handleClose : () => setStep("form")}
            >
              {step === "form" ? "Отмена" : "Назад"}
            </Button>
            <Button type="submit" disabled={createAbsenceMutation.isPending}>
              {step === "form"
                ? "Продолжить"
                : createAbsenceMutation.isPending
                ? "Создание..."
                : "Создать отсутствие"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
