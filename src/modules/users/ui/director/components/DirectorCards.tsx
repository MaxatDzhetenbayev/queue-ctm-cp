"use client";

import clsx from "clsx";
import { MapPin, Phone, Users } from "lucide-react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import React, { Dispatch, SetStateAction } from "react";
import type { DirectorItem } from "@/modules/users/infrastructure/api/director.api";

interface DirectorCardsProps {
  directors: DirectorItem[];
  isLoading: boolean;
  isError: boolean;
  selectedDirector: Dispatch<SetStateAction<string | null>>;
  onOpen: (open: boolean) => void;
}

export const DirectorCards = ({
  directors,
  isLoading,
  isError,
  onOpen,
  selectedDirector,
}: DirectorCardsProps) => {
  const locale = useLocale();
  const t = useTranslations("director.card");

  const handleClickToCard = (id: string) => {
    selectedDirector(id);
    onOpen(true);
  };

  const nameOf = (name: Record<string, string> | undefined) =>
    name?.[locale as "ru" | "kz"] ?? "";

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>
    );
  }

  if (isError || !directors?.length) {
    return (
      <div className="flex flex-col justify-center text-center py-12">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t("empty")}</h3>
        <p className="text-gray-500">{t("emptyDescription")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {directors.map((director) => (
        <div
          key={director.id}
          onClick={() => handleClickToCard(director.id)}
          className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className={clsx("rounded-full p-2 mr-3", {
                  "bg-green-500": director.employeeInfo?.isOnline,
                  "bg-red-500": !director.employeeInfo?.isOnline,
                })}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {director.profile?.fullName}
                </h3>
              </div>
              <div className="ml-2 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-lg">
                  {director.profile?.fullName?.charAt(0) ?? "?"}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {director.profile?.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{director.profile.phone}</span>
                </div>
              )}
              {director.employeeInfo?.center && (
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    {nameOf(director.employeeInfo.center.name)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
