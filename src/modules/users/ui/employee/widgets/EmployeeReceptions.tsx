"use client";

import { Calendar, Clock, FileText, Phone, Search, User } from "lucide-react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { useGetReceptionsByEmployeeIdList } from "@/modules/users/application/use-cases";
import { StatusesType } from "@/modules/users/domain/schemas";
import { Input } from "@/shared/components/ui/input";
import { useSearchQuery, useUrlFilter } from "@/shared/hooks";
import {
  getStatusColor,
  normalizeAuthVariant,
  normalizeStatus,
} from "@/shared/lib";

import { EmployeeReceptionsFilter } from "./EmployeeReceptionsFilter";

import { ClientDetail } from "../../client/widgets/ClientDetail";

export const EmployeeReceptions = ({
  managerId,
  isModalOpen,
}: {
  managerId: string;
  isModalOpen: boolean;
}) => {
  const locale = useLocale();
  const t = useTranslations("employee.receptions");
  const {
    selectedReceptionDate,
    selectedReceptionStatus,
    setPathParams,
    handleClearUrlFilters,
  } = useUrlFilter(["receptionDate", "receptionStatus"]);

  useEffect(() => {
    if (isModalOpen === false) {
      handleClearUrlFilters();
    }
  }, [isModalOpen, handleClearUrlFilters]);

  const [openModal, setOpenModal] = useState(false);
  const [client, setClient] = useState<{
    centerId: string;
    clientId: string;
  } | null>(null);

  const { inputValue, setInputValue, debouncedQuery } = useSearchQuery({
    searchKey: "receptionQuery",
  });

  const { data, isLoading, error } = useGetReceptionsByEmployeeIdList(
    managerId,
    debouncedQuery,
    selectedReceptionStatus as StatusesType,
    selectedReceptionDate
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading receptions</div>;

  return (
    <div className="flex px-4 flex-col gap-4">
      <div className="pt-6 ">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <EmployeeReceptionsFilter
              selectedReceptionDate={selectedReceptionDate}
              selectedReceptionStatus={selectedReceptionStatus}
              setPathParams={setPathParams}
            />
          </div>
        </div>
      </div>

      {data?.map((appointment) => (
        <div
          key={appointment.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <button
                  onClick={() => {
                    setOpenModal(true);
                    setClient({
                      centerId: appointment.center!.id,
                      clientId: appointment.user.id,
                    });
                  }}
                  className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  {appointment.user.profile.fullName}
                </button>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full bg-black  text-white`}
                >
                  {normalizeAuthVariant(appointment.user.authType)}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {normalizeStatus(appointment.status)}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <User className="h-4 w-4" />
              <span>{t("iinBin")}: {appointment.user.profile.iin}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{t("phone")}:</span>
              <span>{appointment.user.profile.phone}</span>
            </div>
            <div className="flex items-center space-x-2 col-span-2 text-gray-600">
              <FileText className="h-4 w-4" />
              <span>{t("service")}:</span>
              <span>{appointment.service.name[locale as "ru" | "kz"]}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 " />
              <span>{t("date")}:</span>
              {new Date(appointment.date).toLocaleDateString(locale === "kz" ? "kk-KZ" : "ru-RU")}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{t("time")}:</span>
              {new Date(appointment.time).toLocaleTimeString(locale === "kz" ? "kk-KZ" : "ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      ))}
      {client && (
        <ClientDetail
          key={client.clientId}
          open={openModal}
          params={{
            centerId: client.centerId,
            clientId: client.clientId,
          }}
          onOpenChange={setOpenModal}
          onClientUpdate={() => {}}
        />
      )}
    </div>
  );
};
