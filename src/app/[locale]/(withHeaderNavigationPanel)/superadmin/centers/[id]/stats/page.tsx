"use client";

import { Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useState } from "react";

import { Link } from "@/shared/configs/i18";

import { AnalyticsWrapper } from "@/modules/analytics/ui";
import { DownloadReportModal } from "@/modules/analytics/ui/components";
import { getCenter } from "@/shared/api/centers.api";
import { Button } from "@/shared/components/ui/button";

const CenterStatsPage = () => {
  const t = useTranslations("superadmin.centers");
  const tReport = useTranslations("report");
  const params = useParams();
  const id = params.id as string;
  const [reportModalOpen, setReportModalOpen] = useState(false);

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
            {center ? nameOf(center) : id} — {t("stats")}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setReportModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            <span>{tReport("downloadReport")}</span>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/superadmin/centers/${id}`}>{t("back")}</Link>
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <AnalyticsWrapper centerId={id} />
      </div>
      <DownloadReportModal
        open={reportModalOpen}
        onOpenChange={setReportModalOpen}
        centerId={id}
      />
    </div>
  );
};

export default CenterStatsPage;
