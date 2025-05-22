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
  if (user?.userLogin) {
    return (
      <Flex align="center" gap="md">
        <Text fz="h4" fw="bold">
          {user?.userLogin}
        </Text>
      </Flex>
    );
  }

  return null;
};
