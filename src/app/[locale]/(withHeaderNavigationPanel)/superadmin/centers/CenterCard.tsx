"use client";

import { useQuery } from "@tanstack/react-query";
import { Calendar, Target, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

import { fetchKeyStats } from "@/modules/analytics/infrastructure/api/client.api";
import { Link } from "@/shared/configs/i18";
import { Button } from "@/shared/components/ui/button";

import type { CenterDto } from "@/shared/api/centers.api";

interface CenterCardProps {
  center: CenterDto;
}

export const CenterCard = ({ center }: CenterCardProps) => {
  const t = useTranslations("superadmin.centers");
  const tStats = useTranslations("superadmin.centers.cardStats");

  const nameOf = (c: CenterDto) =>
    c?.name?.ru ?? c?.name?.kz ?? Object.values(c?.name ?? {})[0] ?? "";

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["key-stats", center.id],
    queryFn: () => fetchKeyStats(undefined, center.id),
    enabled: !!center.id,
  });

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-sm shadow-gray-200/60 transition-shadow hover:shadow-md hover:shadow-gray-200/70">
      <div className="flex flex-1 flex-col gap-3 min-h-0">
        <div className="flex items-start justify-between gap-2 shrink-0">
          <h3 className="font-semibold text-gray-900">
            {nameOf(center)}
          </h3>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/superadmin/centers/${center.id}`}>{t("open")}</Link>
          </Button>
        </div>
        <div className="mt-auto border-t border-gray-100 pt-3 shrink-0">
          {statsLoading ? (
            <p className="text-sm text-gray-400">{t("loading")}</p>
          ) : stats ? (
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-gray-100 p-2.5">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-medium text-gray-600 truncate">
                      {tStats("employeesTitle")}
                    </p>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <Users className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                  </div>
                  <p className="mt-0.5 text-lg font-bold text-gray-900 tabular-nums">
                    {stats.totalManagers.value}
                  </p>
                  <p className="text-xs text-green-600">
                    {tStats("employeesSub", {
                      active: stats.totalManagers.activeManagers,
                    })}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-100 p-2.5">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-medium text-gray-600 truncate">
                      {tStats("receptionsTitle")}
                    </p>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Calendar className="h-3.5 w-3.5 text-green-600" />
                    </div>
                  </div>
                  <p className="mt-0.5 text-lg font-bold text-gray-900 tabular-nums">
                    {stats.totalReceptions.value}
                  </p>
                  <p className="text-xs text-green-600">
                    {tStats("receptionsSub", {
                      done: stats.totalReceptions.doneReceptions,
                    })}
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 p-2.5">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-xs font-medium text-gray-600 truncate">
                    {tStats("completionTitle")}
                  </p>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100">
                    <Target className="h-3.5 w-3.5 text-purple-600" />
                  </div>
                </div>
                <p className="mt-0.5 text-lg font-bold text-gray-900 tabular-nums">
                  {Math.round(stats.receptionsDonePercentage)}%
                </p>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-purple-600 transition-all"
                    style={{
                      width: `${Math.min(100, stats.receptionsDonePercentage)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">—</p>
          )}
        </div>
      </div>
    </div>
  );
};
