"use client";
import { LogoutButton } from "@/features";
import { ProfileCard } from "@/widgets";
import { AppShell, Button, Flex, Stack, Text } from "@mantine/core";
import React from "react";
import { FaUserTie } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const linksData = [
  {
    href: "/admin",
    title: "Главная",
    icon: () => <MdDashboard size={30} color="#9C71F8" />,
  },
  {
    href: "/admin/employees",
    title: "Работники",
    icon: () => <FaUserTie size={30} color="#9C71F8" />,
  },
];

export const WithSideBarTemplate = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const links = linksData.map(({ icon: Icon, href, title }) => (
    <Button
      key={title}
      href={href}
      component="a"
      style={{
        display: "flex",
        textDecoration: "none",
        color: "#9C71F8",
        gap: "20px",
      }}
      variant="white"
    >
      {Icon()}
      <Text fz="h3">{title}</Text>
    </Button>
  ));

  return (
    <AppShell navbar={{ width: 200, breakpoint: "sm" }}>
      <AppShell.Navbar p="md" style={{ height: "100vh" }}>
        <Flex
          direction={"column"}
          align="center"
          justify="space-between"
          h="100%"
        >
          <Flex direction="column" align="center" gap="lg">
            <ProfileCard />
            <Stack justify="center">{links}</Stack>
          </Flex>
          <LogoutButton />
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
