"use client";

import { useTranslations } from "next-intl";
import React, { Suspense } from "react";

import { AdminReceptionsList } from "@/modules/receptions/ui/components";

const AdminReceptionsPage = () => {
  const t = useTranslations("receptions");

  return (
    <div>
      <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("title")}
          </h1>
          <p className="text-gray-600 mt-1">
            {t("subtitle")}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <Suspense fallback={<div className="animate-pulse rounded-lg bg-gray-200 h-64" />}>
          <AdminReceptionsList />
        </Suspense>
      </div>
    </div>
  );
};

export default AdminReceptionsPage;
