"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";

import {
  getCenter,
  attachDepartmentToCenter,
  detachDepartmentFromCenter,
} from "@/shared/api/centers.api";
import { fetchDepartmentList } from "@/modules/departments/infrastructure/api/department.api";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { toast } from "react-toastify";

interface CenterDepartmentsManagementProps {
  centerId: string;
}

export const CenterDepartmentsManagement = ({
  centerId,
}: CenterDepartmentsManagementProps) => {
  const t = useTranslations("superadmin.centers");
  const queryClient = useQueryClient();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");

  const { data: center, isLoading: centerLoading } = useQuery({
    queryKey: ["center", centerId],
    queryFn: () => getCenter(centerId),
  });

  const { data: allDepartments, isLoading: departmentsLoading } = useQuery({
    queryKey: ["departments-list"],
    queryFn: fetchDepartmentList,
  });

  const attachMutation = useMutation({
    mutationFn: (departmentId: string) =>
      attachDepartmentToCenter(centerId, departmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["center", centerId] });
      queryClient.invalidateQueries({ queryKey: ["departments-list"] });
      toast.success("Департамент успешно добавлен к центру");
      setSelectedDepartmentId("");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Ошибка при добавлении департамента"
      );
    },
  });

  const detachMutation = useMutation({
    mutationFn: (centerDepartmentId: string) =>
      detachDepartmentFromCenter(centerId, centerDepartmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["center", centerId] });
      toast.success("Департамент успешно удален из центра");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Ошибка при удалении департамента";
      toast.error(message);
    },
  });

  const centerDepartments = center?.departments || [];
  const availableDepartments =
    allDepartments?.filter(
      (department) =>
        !centerDepartments.some(
          (cd) => cd.departmentId && cd.departmentId === department.id
        )
    ) || [];

  const nameOf = (name: Record<string, string> | string) => {
    if (typeof name === "object") {
      return name.ru ?? name.kz ?? Object.values(name)[0] ?? "";
    }
    return String(name);
  };

  const handleAddDepartment = () => {
    if (!selectedDepartmentId) {
      toast.warning("Выберите департамент для добавления");
      return;
    }
    attachMutation.mutate(selectedDepartmentId);
  };

  const handleRemoveDepartment = (
    centerDepartmentId: string,
    departmentName: string
  ) => {
    if (
      !confirm(
        `Вы уверены, что хотите удалить департамент "${departmentName}" из центра? Департаменты с записями нельзя удалить.`
      )
    ) {
      return;
    }
    detachMutation.mutate(centerDepartmentId);
  };

  if (centerLoading || departmentsLoading) {
    return <p className="text-gray-500">{t("loading")}</p>;
  }

  return (
    <div className="space-y-6">
      {/* Добавление департамента */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Добавить департамент к центру
        </h2>
        <div className="flex gap-3">
          <Select
            value={selectedDepartmentId}
            onValueChange={setSelectedDepartmentId}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Выберите департамент" />
            </SelectTrigger>
            <SelectContent>
              {availableDepartments.length > 0 ? (
                availableDepartments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {nameOf(department.name)}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-departments" disabled>
                  Нет доступных департаментов
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <Button
            onClick={handleAddDepartment}
            disabled={!selectedDepartmentId || attachMutation.isPending}
          >
            <Plus className="mr-2 h-4 w-4" />
            Добавить
          </Button>
        </div>
      </div>

      {/* Список департаментов центра */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Департаменты центра ({centerDepartments.length})
          </h2>
        </div>
        {centerDepartments.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {centerDepartments.map((centerDepartment) => (
              <li
                key={centerDepartment.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">
                  {centerDepartment.department
                    ? nameOf(centerDepartment.department.name)
                    : "Без департамента"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleRemoveDepartment(
                      centerDepartment.id,
                      centerDepartment.department
                        ? nameOf(centerDepartment.department.name)
                        : "Без департамента"
                    )
                  }
                  disabled={detachMutation.isPending}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Удалить
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500">
            У центра пока нет департаментов. Добавьте департаменты выше.
          </div>
        )}
      </div>
    </div>
  );
};
