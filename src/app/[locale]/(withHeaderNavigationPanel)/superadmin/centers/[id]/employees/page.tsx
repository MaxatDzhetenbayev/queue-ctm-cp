"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";

import { Link } from "@/shared/configs/i18";

import { EmployeeList } from "@/modules/users/ui/employee";
import { Button } from "@/shared/components/ui/button";

const CenterEmployeesPage = () => {
  const t = useTranslations("superadmin.centers");
  const params = useParams();
  const id = params.id as string;

  return (
    <div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{t("employees")}</h1>
        <Button variant="outline" asChild>
          <Link href={`/superadmin/centers/${id}`}>{t("back")}</Link>
        </Button>
      </div>
      <Suspense
        fallback={
          <div className="mt-6 animate-pulse rounded-lg bg-gray-200 h-64" />
        }
      >
        <EmployeeList centerId={id} hideHeader />
      </Suspense>
    </div>
  );
};

export default CenterEmployeesPage;
