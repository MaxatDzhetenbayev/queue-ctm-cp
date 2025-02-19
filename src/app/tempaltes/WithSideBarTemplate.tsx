"use client";
import { LogoutButton } from "@/features";
import { ProfileCard } from "@/widgets";
import { AppShell } from "@mantine/core";
import Link from "next/link";
import React from "react";

export const WithSideBarTemplate = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AppShell padding="md">
      <AppShell.Navbar p="md">
        <div className="flex items-center space-x-4">
          <ProfileCard />
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                href="/admin"
                className="hover:bg-blue-700 px-4 py-2 rounded block"
              >
                Главная
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products"
                className="hover:bg-blue-700 px-4 py-2 rounded block"
              >
                Работники
              </Link>
            </li>
          </ul>
        </nav>
        <LogoutButton />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
