"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { useGetServiceList } from "@/modules/users/application/use-cases/get-service-list.usecases";
import { Button } from "@/shared/components/ui/button";

import { ServiceFormModal } from "./ServiceFormModal";

const SuperadminServicesPage = () => {
  const t = useTranslations("superadmin.services");
  const { data: services, isLoading } = useGetServiceList();
  const [createOpen, setCreateOpen] = useState(false);
  const [editService, setEditService] = useState<{
    id: string;
    name: Record<string, string>;
  } | null>(null);

  return (
    <div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="mt-1 text-gray-600">{t("subtitle")}</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>{t("create")}</Button>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <p className="text-gray-500">{t("loading")}</p>
        ) : (
          <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
            {services?.length ? (
              services.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="font-medium">
                    {typeof s.name === "object"
                      ? (s.name as { ru?: string }).ru ?? (s.name as { kz?: string }).kz ?? s.id
                      : String(s.name)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setEditService({
                        id: s.id,
                        name: (s.name || {}) as Record<string, string>,
                      })
                    }
                  >
                    {t("edit")}
                  </Button>
                </li>
              ))
            ) : (
              <li className="px-4 py-8 text-center text-gray-500">
                {t("noData")}
              </li>
            )}
          </ul>
        )}
      </div>
      <ServiceFormModal open={createOpen} onOpenChange={setCreateOpen} />
      <ServiceFormModal
        open={!!editService}
        onOpenChange={(open) => !open && setEditService(null)}
        service={editService}
      />
    </div>
  );
};

export default SuperadminServicesPage;
