"use client";

import React from "react";
import { useLogout } from "../hooks/useLogout";
import { Button } from "@mantine/core";

export const LogoutButton = () => {
  const { mutate } = useLogout();

  return <Button onClick={() => mutate()}>Выйти</Button>;
};
