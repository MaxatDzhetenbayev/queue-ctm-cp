"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";

import { Link } from "@/shared/configs/i18";

import { DirectorList } from "@/modules/users/ui/director";
import { getCenter } from "@/shared/api/centers.api";
import { Button } from "@/shared/components/ui/button";

const CenterDirectorsPage = () => {
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
        <h1 className="text-3xl font-bold text-gray-900">
          {center ? nameOf(center) : id} — {t("directors")}
        </h1>
        <Button variant="outline" asChild>
          <Link href={`/superadmin/centers/${id}`}>{t("back")}</Link>
        </Button>
      </div>
      <Suspense
        fallback={
          <div className="mt-6 animate-pulse rounded-lg bg-gray-200 h-64" />
        }
      >
        <DirectorList centerId={id} hideHeader />
      </Suspense>
    </div>
  );
};

export default CenterDirectorsPage;
