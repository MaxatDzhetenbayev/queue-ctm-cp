"use client";

import React from "react";

import { ManagerStartWork } from "@/modules/activity";

import { ManagerReceptions } from "../widgets/ManagerReceptions";

export const ManagerReceptionsPage: React.FC = () => {
  return (
    <div className="pt-6">
      <ManagerStartWork />
      <ManagerReceptions />
    </div>
  );
};
