"use client";
import { Flex } from "@mantine/core";
import Link from "next/link";
import React from "react";

export const Navigation = () => {
  return (
    <Flex gap={20} align="center">
      <Link style={{ textDecoration: "none", color: "black" }} href="/admin">
        Главная
      </Link>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        href="/admin/workers"
      >
        Персонал
      </Link>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        href="/admin/absences"
      >
        Отсутствия
      </Link>
    </Flex>
  );
};
