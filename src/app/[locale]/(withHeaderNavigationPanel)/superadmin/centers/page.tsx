"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { fetchCenters } from "@/shared/api/centers.api";
import { Button } from "@/shared/components/ui/button";

import { CenterCard } from "./CenterCard";
import { CreateCenterModal } from "./CreateCenterModal";

const SuperadminCentersPage = () => {
  const t = useTranslations("superadmin.centers");
  const [createOpen, setCreateOpen] = useState(false);
  const { data: centers, isLoading } = useQuery({
    queryKey: ["centers-list"],
    queryFn: fetchCenters,
  });

  return (
    <div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="mt-1 text-gray-600">{t("subtitle")}</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>{t("create")}</Button>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <p className="text-gray-500">{t("loading")}</p>
        ) : centers?.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {centers.map((c) => (
              <CenterCard key={c.id} center={c} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-gray-200 bg-white py-12 text-center text-gray-500">
            {t("noData")}
          </p>
        )}
      </div>
      <CreateCenterModal open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
};

export default SuperadminCentersPage;
