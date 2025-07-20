"use client";

import { useGetUserProfile } from "../application/use-cases/get-user-profile";

export const UserCard = () => {
  const { data } = useGetUserProfile();

  return <div className="my-10">{data?.name}</div>;
};
