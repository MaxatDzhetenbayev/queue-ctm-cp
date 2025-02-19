"use client";
import React from "react";
import { useProfile } from "../hooks/useProfile";
import { Avatar, Flex, Skeleton, Text, Title } from "@mantine/core";

export const ProfileCard = () => {
  const { data: user, isLoading, isError } = useProfile();

  if (isLoading) {
    return (
      <Flex direction="column" align="center" gap="md">
        <Skeleton h={60} w={60} circle />
        <Skeleton h={20} w={60} />
      </Flex>
    );
  }

  if (isError) {
    return <Title order={4}>Ошибка загрузки профиля</Title>;
  }
  if (user.userLogin) {
    return (
      <Flex direction="column" align="center" gap="md">
        <Avatar name={user?.userLogin} color="#9C71F8" h={60} w={60} />
        <Text fz="h4" fw="bold">
          {user?.userLogin}
        </Text>
      </Flex>
    );
  }

  return null;
};
