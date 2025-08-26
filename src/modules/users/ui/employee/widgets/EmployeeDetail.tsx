"use client";

import clsx from "clsx";
import { Edit2, User } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("info");

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
      </DialogContent>
    </Dialog>
  );
};
