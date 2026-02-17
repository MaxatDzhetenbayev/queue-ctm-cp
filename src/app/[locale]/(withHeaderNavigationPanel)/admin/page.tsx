"use client";

import { Download } from "lucide-react";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

import { AnalyticsWrapper } from "@/modules/analytics/ui";
import { DownloadReportModal } from "@/modules/analytics/ui/components";
import { Button } from "@/shared/components/ui/button";

const AdminPage = () => {
  const t = useTranslations("report");
  const [reportModalOpen, setReportModalOpen] = useState(false);

  return (
    <div>
      <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="">
          <h1 className="text-3xl font-bold text-gray-900">
            Панель управления
          </h1>
          <p className="text-gray-600 mt-1">
            Обзор деятельности центров карьеры
          </p>
        </div>
        <Button
          onClick={() => setReportModalOpen(true)}
          className="flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>{t("downloadReport")}</span>
        </Button>
      </div>
      <div className="mt-4">
        <AnalyticsWrapper />
      </div>
      <DownloadReportModal
        open={reportModalOpen}
        onOpenChange={setReportModalOpen}
      />
    </div>
  );
};

export default AdminPage;
