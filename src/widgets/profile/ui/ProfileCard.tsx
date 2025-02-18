"use client";
import React from "react";
import { useProfile } from "../hooks/useProfile";
import { Title } from "@mantine/core";

export const ProfileCard = () => {
  const { data: user, isLoading, isError } = useProfile();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <h2 className="text-xl font-semibold">Ошибка загрузки профиля</h2>;
  }
  if (user.userLogin) {
    return <Title order={4}>Добро пожаловать, {user?.userLogin}!</Title>;
  }

  return null;
};
