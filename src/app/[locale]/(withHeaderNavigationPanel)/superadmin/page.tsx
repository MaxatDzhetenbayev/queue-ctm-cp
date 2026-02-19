"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { AnalyticsWrapper } from "@/modules/analytics/ui";

const SuperadminDashboardPage = () => {
  const t = useTranslations("superadmin.dashboard");

  return (
    <div>
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-1 text-gray-600">{t("subtitle")}</p>
      </div>
      <div className="mt-4">
        <AnalyticsWrapper />
      </div>
    </div>
  );
};

export default SuperadminDashboardPage;
