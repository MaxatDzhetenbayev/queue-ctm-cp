"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { fetchDepartmentCatalog } from "@/modules/departments/infrastructure/api/department.api";
import { Button } from "@/shared/components/ui/button";

import { DepartmentFormModal } from "./DepartmentFormModal";

const SuperadminDepartmentsPage = () => {
  const t = useTranslations("superadmin.departments");
  const { data: departments, isLoading } = useQuery({
    queryKey: ["department-catalog"],
    queryFn: () => fetchDepartmentCatalog(),
  });
  const [createOpen, setCreateOpen] = useState(false);
  const [editDepartment, setEditDepartment] = useState<{
    id: string;
    name?: unknown;
  } | null>(null);

  const nameOf = (d: { name?: unknown }) => {
    if (typeof d.name === "object" && d.name && "ru" in d.name)
      return (d.name as { ru?: string }).ru;
    if (typeof d.name === "object" && d.name && "kz" in d.name)
      return (d.name as { kz?: string }).kz;
    return d.name ? String(d.name) : "";
  };

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
            {departments?.length ? (
              departments.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="font-medium">{nameOf(d)}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditDepartment({ id: d.id, name: d.name })}
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
      <DepartmentFormModal open={createOpen} onOpenChange={setCreateOpen} />
      <DepartmentFormModal
        open={!!editDepartment}
        onOpenChange={(open) => !open && setEditDepartment(null)}
        department={editDepartment}
      />
    </div>
  );
};

export default SuperadminDepartmentsPage;
