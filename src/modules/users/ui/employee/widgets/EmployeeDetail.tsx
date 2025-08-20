"use client";

import clsx from "clsx";
import { Edit2, Save, User } from "lucide-react";
import React, { useState } from "react";

import { useGetEmployeeById } from "@/modules/users/application/use-cases";
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

// import { ActivityCalendar } from "./ActivityCalendar";
// import { AppointmentsList } from "./AppointmentsList";

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
  const [editedEmployee, setEditedEmployee] = useState<any | null>(null);

  const { data: employee } = useGetEmployeeById({ id: selectedEmployee! });

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
                  "bg-red-500": employee?.employeeInfo.isOnline,
                })}
              ></div>
            </div>
            {/* <div className="flex items-center space-x-2">
              {activeTab === "info" && (
                <button
                  // onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Сохранить</span>
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4" />
                      <span>Редактировать</span>
                    </>
                  )}
                </button>
              )}
              {isEditing && (
                <button
                  // onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </button>
              )}
            </div> */}
          </div>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <Tabs defaultValue="info">
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
                editedEmployee={editedEmployee}
                setEditedEmployee={setEditedEmployee}
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
      </DialogContent>
    </Dialog>
  );
};
