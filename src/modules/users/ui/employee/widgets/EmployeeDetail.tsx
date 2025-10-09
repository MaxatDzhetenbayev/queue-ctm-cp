"use client";

import clsx from "clsx";
import { Edit2, User } from "lucide-react";
import React, { useState } from "react";

import {
  useArchiveEmployee,
  useGetEmployeeById,
  useRemoveEmployee,
  useRestoreEmployee,
} from "@/modules/users/application/use-cases";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";

import { EmployeeReceptions } from "./EmployeeReceptions";

import { EmployeeInfo } from "../components/EmployeeInfo";

export const EmployeeDetail = ({
  open,
  selectedEmployee,
  onOpenChange,
}: {
  open: boolean;
  selectedEmployee: string | null;
  onOpenChange: (open: boolean) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const [editedEmployee, setEditedEmployee] = useState<any | null>(null);

  const { data: employee } = useGetEmployeeById({ id: selectedEmployee! });
  const [activeTab, setActiveTab] = useState("info");

  const archiveMutation = useArchiveEmployee(selectedEmployee || "");
  const restoreMutation = useRestoreEmployee(selectedEmployee || "");
  const removeMutation = useRemoveEmployee(selectedEmployee || "");

  const handleArchive = async () => {
    if (!selectedEmployee) return;
    try {
      await archiveMutation.mutateAsync(undefined as unknown as void);
      onOpenChange(false);
    } catch {}
  };

  const handleRestore = async () => {
    if (!selectedEmployee) return;
    try {
      await restoreMutation.mutateAsync(undefined as unknown as void);
      onOpenChange(false);
    } catch {}
  };

  const handleRemove = async () => {
    if (!selectedEmployee) return;
    const confirm = window.confirm(
      "Удалить сотрудника без возможности восстановления?"
    );
    if (!confirm) return;
    try {
      await removeMutation.mutateAsync(undefined as unknown as void);
      onOpenChange(false);
    } catch {}
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[900px]">
        <DialogHeader>
          <DialogDescription className="hidden">
            Здесь будет описание сотрудника
          </DialogDescription>
          <div className="flex items-center justify-between pt-2 px-3">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <DialogTitle className="text-xl font-bold text-gray-900">
                {employee?.profile.fullName}
              </DialogTitle>
              <div
                className={clsx("rounded-full p-2 mr-3", {
                  "bg-green-500": employee?.employeeInfo.isOnline,
                  "bg-red-500": !employee?.employeeInfo.isOnline,
                })}
              ></div>
            </div>
            <div className="flex items-center space-x-2">
              {!isEditing && activeTab === "info" && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Редактировать</span>
                </button>
              )}
            </div>
          </div>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <Tabs
            defaultValue="info"
            onValueChange={(value) => {
              setActiveTab(value);
            }}
          >
            <TabsList className="bg-transparent mb-3 px-4">
              <TabsTrigger value="info" className="rounded-none">
                Информация
              </TabsTrigger>
              <TabsTrigger value="employee-receptions" className="rounded-none">
                Записи
              </TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <EmployeeInfo
                employee={employee}
                isEditing={isEditing}
                setEditedEmployee={(value) => {
                  setEditedEmployee(value);
                  if (value === null) {
                    setIsEditing(false);
                  }
                }}
              />
            </TabsContent>
            <TabsContent value="employee-receptions">
              <EmployeeReceptions
                managerId={selectedEmployee!}
                isModalOpen={open}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom action bar */}
        <div className="mt-4 pt-4 border-t flex items-center justify-end gap-2 px-3">
          <button
            onClick={handleArchive}
            disabled={archiveMutation.isPending}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {archiveMutation.isPending ? "Архивируем..." : "В архив"}
          </button>
          <button
            onClick={handleRestore}
            disabled={restoreMutation.isPending}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {restoreMutation.isPending ? "Восстанавливаем..." : "Восстановить"}
          </button>
          <button
            onClick={handleRemove}
            disabled={removeMutation.isPending}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {removeMutation.isPending ? "Удаляем..." : "Удалить"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
