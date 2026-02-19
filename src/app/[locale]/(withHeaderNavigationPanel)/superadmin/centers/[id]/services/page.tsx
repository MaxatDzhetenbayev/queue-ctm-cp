"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";

import { Link } from "@/shared/configs/i18";

import { Button } from "@/shared/components/ui/button";

const CenterServicesPage = () => {
  const t = useTranslations("superadmin.centers");
  const params = useParams();
  const id = params.id as string;

  return (
    <div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{t("services")}</h1>
        <Button variant="outline" asChild>
          <Link href={`/superadmin/centers/${id}`}>{t("back")}</Link>
        </Button>
      </div>
      <p className="mt-4 text-gray-600">Управление сервисами центра — в разработке.</p>
    </div>
  );
};

export default CenterServicesPage;
