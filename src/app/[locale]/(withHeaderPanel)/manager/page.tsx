"use client";

import React, { Suspense } from "react";

import { ManagerReceptionsPage } from "@/modules/receptions";

export default function ManagerPage() {
  return (
    <Suspense fallback={<div className="animate-pulse rounded-lg bg-gray-200 h-64" />}>
      <ManagerReceptionsPage />
    </Suspense>
  );
}
