"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";

import { Link } from "@/shared/configs/i18";

import { getCenter } from "@/shared/api/centers.api";
import { Button } from "@/shared/components/ui/button";
import { axiosApi } from "@/shared/lib/client";

const CenterDirectorsPage = () => {
  const t = useTranslations("superadmin.centers");
  const params = useParams();
  const id = params.id as string;

  const { data: center } = useQuery({
    queryKey: ["center", id],
    queryFn: () => getCenter(id),
    enabled: !!id,
  });

  const { data: directors, isLoading } = useQuery({
    queryKey: ["directors", id],
    queryFn: async () => {
      const res = await axiosApi.get(`/users/directors/center?centerId=${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const nameOf = (c: { name?: Record<string, string | undefined> }) =>
    c?.name?.ru ?? c?.name?.kz ?? id;

  return (
    <div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {center ? nameOf(center) : id} — {t("directors")}
          </h1>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/superadmin/centers/${id}`}>{t("back")}</Link>
        </Button>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <p>{t("loading")}</p>
        ) : (
          <ul className="divide-y divide-gray-200 rounded-lg border bg-white">
            {directors?.length ? (
              directors.map((d: { id: string; profile?: { fullName?: string }; login?: string }) => (
                <li key={d.id} className="px-4 py-3">
                  {d.profile?.fullName ?? d.login ?? d.id}
                </li>
              ))
            ) : (
              <li className="px-4 py-8 text-center text-gray-500">
                Нет директоров
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CenterDirectorsPage;
