"use client";

import { useQuery } from "@tanstack/react-query";
import { BarChart3, Building2, FileText, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";

import { Link } from "@/shared/configs/i18";

import { getCenter } from "@/shared/api/centers.api";
import { Button } from "@/shared/components/ui/button";

const CenterDetailPage = () => {
  const t = useTranslations("superadmin.centers");
  const params = useParams();
  const id = params.id as string;

  const { data: center, isLoading } = useQuery({
    queryKey: ["center", id],
    queryFn: () => getCenter(id),
    enabled: !!id,
  });

  const nameOf = (c: { name?: Record<string, string | undefined> }) =>
    c?.name?.ru ?? c?.name?.kz ?? id;

  if (isLoading || !center) {
    return <div className="mt-6">{t("loading")}</div>;
  }

  const links = [
    { href: `/superadmin/centers/${id}/stats`, icon: BarChart3, key: "stats" },
    {
      href: `/superadmin/centers/${id}/directors`,
      icon: Users,
      key: "directors",
    },
    {
      href: `/superadmin/centers/${id}/departments`,
      icon: Building2,
      key: "departments",
    },
    {
      href: `/superadmin/centers/${id}/employees`,
      icon: Users,
      key: "employees",
    },
    {
      href: `/superadmin/centers/${id}/receptions`,
      icon: FileText,
      key: "receptions",
    },
  ];

  return (
    <div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {nameOf(center)}
          </h1>
          <p className="mt-1 text-gray-600">{t("subtitle")}</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/superadmin/centers">{t("back")}</Link>
        </Button>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {links.map(({ href, icon: Icon, key }) => (
          <Link
            key={key}
            href={href}
            className="group relative flex min-h-[112px] items-center gap-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm ring-1 ring-slate-100 transition-transform transition-shadow hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:ring-blue-100"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-100/80 transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-400/80">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">
                {t(key)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CenterDetailPage;
