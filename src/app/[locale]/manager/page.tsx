"use client";

import React from "react";

import { ManagerReceptions } from "@/modules/receptions/ui/widgets/ManagerReceptions";

export default function ManagerPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ManagerReceptions />
    </div>
  );
}
