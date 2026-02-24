/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Trash2, Plus, Pencil } from "lucide-react";

import {
  getCenter,
  attachDepartmentToCenter,
  detachDepartmentFromCenter,
  updateCenterDepartmentFeatures,
} from "@/shared/api/centers.api";
import { fetchDepartmentCatalog } from "@/modules/departments/infrastructure/api/department.api";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { toast } from "react-toastify";
import { DepartmentFeaturesModal } from "./DepartmentFeaturesModal";

interface CenterDepartmentsManagementProps {
  centerId: string;
}

export const CenterDepartmentsManagement = ({
  centerId,
}: CenterDepartmentsManagementProps) => {
  const t = useTranslations("superadmin.centers");
  const queryClient = useQueryClient();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");
  const [addFeaturesModalOpen, setAddFeaturesModalOpen] = useState(false);
  const [editCenterDepartmentId, setEditCenterDepartmentId] = useState<
    string | null
  >(null);

  const { data: center, isLoading: centerLoading } = useQuery({
    queryKey: ["center", centerId],
    queryFn: () => getCenter(centerId),
  });

  const { data: allDepartments, isLoading: departmentsLoading } = useQuery({
    queryKey: ["department-catalog"],
    queryFn: () => fetchDepartmentCatalog(),
  });

  const attachMutation = useMutation({
    mutationFn: ({
      departmentId,
      departmentFeatures,
    }: {
      departmentId: string;
      departmentFeatures?: { [key: string]: string };
    }) =>
      attachDepartmentToCenter(centerId, departmentId, departmentFeatures),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["center", centerId] });
      queryClient.invalidateQueries({ queryKey: ["department-catalog"] });
      toast.success("Департамент успешно добавлен к центру");
      setSelectedDepartmentId("");
      setAddFeaturesModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Ошибка при добавлении департамента"
      );
    },
  });

  const updateFeaturesMutation = useMutation({
    mutationFn: ({
      centerDepartmentId,
      departmentFeatures,
    }: {
      centerDepartmentId: string;
      departmentFeatures: { [key: string]: string };
    }) =>
      updateCenterDepartmentFeatures(
        centerId,
        centerDepartmentId,
        departmentFeatures
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["center", centerId] });
      toast.success("Настройки отдела сохранены");
      setEditCenterDepartmentId(null);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Ошибка при сохранении настроек отдела"
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

  const handleAddDepartmentClick = () => {
    if (!selectedDepartmentId) {
      toast.warning("Выберите департамент для добавления");
      return;
    }
    setAddFeaturesModalOpen(true);
  };

  const handleAddFeaturesSubmit = (departmentFeatures: {
    [key: string]: string;
  }) => {
    attachMutation.mutate({
      departmentId: selectedDepartmentId,
      departmentFeatures,
    });
  };

  const editingCenterDepartment = editCenterDepartmentId
    ? centerDepartments.find((cd) => cd.id === editCenterDepartmentId)
    : null;

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
          {t("addDepartmentToCenter")}
        </h2>
        <div className="flex gap-3">
          <Select
            value={selectedDepartmentId}
            onValueChange={setSelectedDepartmentId}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder={t("selectDepartment")} />
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
                  {t("noDepartmentsAvailable")}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <Button
            onClick={handleAddDepartmentClick}
            disabled={!selectedDepartmentId || attachMutation.isPending}
          >
            <Plus className="mr-2 h-4 w-4" />
            {t("addDepartment")}
          </Button>
        </div>

        <DepartmentFeaturesModal
          open={addFeaturesModalOpen}
          onOpenChange={setAddFeaturesModalOpen}
          title={t("departmentFeaturesModalTitle")}
          submitLabel={t("addDepartment")}
          onSubmit={handleAddFeaturesSubmit}
          isSubmitting={attachMutation.isPending}
        />
      </div>

      {/* Список департаментов центра */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("centerDepartmentsCount", {
              count: centerDepartments.length,
            })}
          </h2>
        </div>
        {centerDepartments.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {centerDepartments.map((centerDepartment) => (
              <li
                key={centerDepartment.id}
                className="flex items-center justify-between gap-2 px-4 py-3 hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">
                  {centerDepartment.department
                    ? nameOf(centerDepartment.department.name)
                    : "Без департамента"}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditCenterDepartmentId(centerDepartment.id)}
                    disabled={updateFeaturesMutation.isPending}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    {t("editDepartmentFeatures")}
                  </Button>
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
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500">
            {t("noCenterDepartments")}
          </div>
        )}
      </div>

      <DepartmentFeaturesModal
        open={!!editCenterDepartmentId}
        onOpenChange={(open) => !open && setEditCenterDepartmentId(null)}
        title={t("departmentFeaturesModalEditTitle")}
        initialFeatures={editingCenterDepartment?.departmentFeatures}
        submitLabel={t("save")}
        onSubmit={(departmentFeatures) => {
          if (editCenterDepartmentId) {
            updateFeaturesMutation.mutate({
              centerDepartmentId: editCenterDepartmentId,
              departmentFeatures,
            });
          }
        }}
        isSubmitting={updateFeaturesMutation.isPending}
      />
    </div>
  );
};
