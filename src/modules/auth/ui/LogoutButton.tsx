"use client";

import { LogOut } from "lucide-react";
import React from "react";

import { useLogout } from "../application/use-cases";

export const LogoutButton = () => {
  const { mutate, isPending } = useLogout();

  const handleLogout = () => {
    mutate(undefined);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="cursor-pointer flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="Выйти из системы"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Выйти</span>
    </button>
  );
};
