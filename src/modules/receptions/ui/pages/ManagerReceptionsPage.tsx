"use client";

import React from "react";

import { ManagerReceptions } from "../widgets/ManagerReceptions";

export const ManagerReceptionsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <ManagerReceptions />
        </div>
      </div>
    </div>
  );
};
