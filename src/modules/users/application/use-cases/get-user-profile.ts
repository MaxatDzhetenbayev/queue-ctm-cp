import { fetchUserProfile } from "../../infrastructure/api/user.api";
import { useQuery } from "@tanstack/react-query";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
  });
};
