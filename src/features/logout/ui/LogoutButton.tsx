"use client";

import React from "react";
import { useLogout } from "../hooks/useLogout";
import { IoLogOut } from "react-icons/io5";

export const LogoutButton = () => {
  const { mutate } = useLogout();

  return (
    <IoLogOut
      style={{ cursor: "pointer" }}
      onClick={() => mutate()}
      size={40}
      color="#9C71F8"
    />
  );
};
