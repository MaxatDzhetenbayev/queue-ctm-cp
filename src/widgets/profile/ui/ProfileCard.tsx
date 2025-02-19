"use client";
import React from "react";
import { useProfile } from "../hooks/useProfile";
import { Skeleton, Title } from "@mantine/core";

export const ProfileCard = () => {
  const { data: user, isLoading, isError } = useProfile();

  if (isLoading) {
    return <Skeleton h={35} w={200} />;
  }

  if (isError) {
    return <Title order={4}>Ошибка загрузки профиля</Title>;
  }
  if (user.userLogin) {
    return <Title order={4}>Добро пожаловать, {user?.userLogin}!</Title>;
  }

  return null;
};
