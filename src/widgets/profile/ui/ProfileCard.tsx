"use client";
import React from "react";
import { useProfile } from "../hooks/useProfile";

export const ProfileCard = () => {
  const { data: user, isLoading, isError } = useProfile();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <h2 className="text-xl font-semibold">Ошибка загрузки профиля</h2>;
  }
  if (user.userLogin) {
    return (
      <h2 className="text-xl font-semibold">
        Добро пожаловать, {user?.userLogin}!
      </h2>
    );
  }

  return null;
};
