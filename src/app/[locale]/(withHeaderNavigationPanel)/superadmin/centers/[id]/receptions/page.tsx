"use client";

import { useParams } from "next/navigation";
import React from "react";

import { AdminReceptionsList } from "@/modules/receptions/ui/components";
import { Link } from "@/shared/configs/i18";
import { useTranslations } from "next-intl";

import { getCenter } from "@/shared/api/centers.api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";

const CenterReceptionsPage = () => {
  const t = useTranslations("superadmin.centers");
  const params = useParams();
  const id = params.id as string;

  const { data: center } = useQuery({
    queryKey: ["center", id],
    queryFn: () => getCenter(id),
    enabled: !!id,
  });

  const nameOf = (c: { name?: Record<string, string | undefined> }) =>
    c?.name?.ru ?? c?.name?.kz ?? id;

  return (
    <div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {center ? nameOf(center) : id} — {t("receptions")}
          </h1>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/superadmin/centers/${id}`}>{t("back")}</Link>
        </Button>
      </div>
      <div className="mt-4">
        <AdminReceptionsList centerIdFilter={id} />
      </div>
    </div>
  );
};

export default CenterReceptionsPage;
