"use client";

import React from "react";
import { useLogout } from "../hooks/useLogout";

export const LogoutButton = () => {
  const { mutate } = useLogout();

  return (
    <button
      onClick={() => mutate()}
      className="p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Выйти
    </button>
  );
};
