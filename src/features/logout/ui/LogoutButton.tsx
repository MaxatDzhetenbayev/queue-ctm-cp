"use client";

import React from "react";
import { useLogout } from "../hooks/useLogout";
import { Button } from "@mantine/core";

export const LogoutButton = () => {
  const { mutate } = useLogout();

  return (
    <Button bg="#611BF8" onClick={() => mutate()}>
      Выйти
    </Button>
  );
};
