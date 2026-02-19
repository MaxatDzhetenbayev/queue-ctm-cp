"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { Suspense, useState } from "react";

import { AdminReceptionsList } from "@/modules/receptions/ui/components";
import { fetchCenters } from "@/shared/api/centers.api";

const SuperadminReceptionsPage = () => {
  const t = useTranslations("superadmin.receptions");
  const [centerId, setCenterId] = useState<string>("");

  const { data: centers } = useQuery({
    queryKey: ["centers-list"],
    queryFn: fetchCenters,
  });

  return (
    <div>
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="mt-1 text-gray-600">{t("subtitle")}</p>
      </div>
      <div className="mt-4">
        <Suspense fallback={<div className="text-gray-500">{t("loading")}</div>}>
          <AdminReceptionsList
            centerIdFilter={centerId || undefined}
            onCenterIdChange={setCenterId}
            centersForFilter={centers}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default SuperadminReceptionsPage;
