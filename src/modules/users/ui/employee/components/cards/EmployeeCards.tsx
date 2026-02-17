"use client";

import clsx from "clsx";
import { Briefcase, MapPin, Phone, Users } from "lucide-react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import React, { Dispatch, SetStateAction } from "react";

import { EmployeeType } from "@/modules/users/domain/schemas";

import { EmployeeCardSkeleton } from "./EmployeeCardSkeleton";

interface EmployeeCardsProps {
  employeeListLoading: boolean;
  employeeListError: boolean;
  employeeList: EmployeeType;
  selectedEmployee: Dispatch<SetStateAction<string | null>>;
  onOpen: (open: boolean) => void;
}

export const EmployeeCards = ({
  employeeListLoading,
  employeeListError,
  employeeList,
  onOpen,
  selectedEmployee,
}: EmployeeCardsProps) => {
  const locale = useLocale();
  const t = useTranslations("employee.card");
  
  const handleClickToCard = (employeeId: string): void => {
    selectedEmployee(employeeId);
    onOpen(true);
  };

  return (
    <div>
      {employeeListLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <EmployeeCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {employeeListError ||
          !employeeList?.managers ||
          employeeList.managers.length <= 0 ? (
            <div className="flex flex-col justify-center text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t("empty")}
              </h3>
              <p className="text-gray-500">
                {t("emptyDescription")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employeeList?.managers.map((employee) => (
                <div
                  onClick={() => handleClickToCard(employee.id)}
                  key={employee.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={clsx("rounded-full p-2 mr-3", {
                          "bg-green-500": employee.employeeInfo.isOnline,
                          "bg-red-500": !employee.employeeInfo.isOnline,
                        })}
                      ></div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {employee.profile.fullName}
                        </h3>
                      </div>
                      <div className="ml-2 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-lg">
                          {employee.profile.fullName.charAt(0)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{employee.profile.phone}</span>
                      </div>

                      <div className="flex items-start text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{employee.employeeInfo.center.name[locale as "ru" | "kz"]}</span>
                      </div>

                      <div className="flex items-start text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{employee.employeeInfo.department.name[locale as "ru" | "kz"]}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-500 mb-2">
                        {t("services")}:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {employee.employeeServices.map(({ service }, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full"
                          >
                            {service.name[locale as "ru" | "kz"]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
