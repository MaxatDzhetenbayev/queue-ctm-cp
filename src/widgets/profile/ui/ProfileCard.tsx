"use client";
import React from "react";
import { useProfile } from "../hooks/useProfile";
import { Flex, Skeleton, Text, Title } from "@mantine/core";

export const ProfileCard = () => {
  const { data: user, isLoading, isError } = useProfile();

  if (isLoading) {
    return <Skeleton h={20} w={60} />;
  }

  if (isError) {
    return <Title order={4}>Ошибка загрузки профиля</Title>;
  }

  if (user?.profile?.fullName) {
    return (
      <Flex align="center" gap="md">
        <Text fz="h4" fw="bold">
          {user?.profile?.fullName}
        </Text>
      </Flex>
    );
  }

  return null;
};
