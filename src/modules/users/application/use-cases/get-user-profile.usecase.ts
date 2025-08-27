import { fetchUserProfile } from "@/modules/users/infrastructure/api/user.api";

import { useQuery } from "@tanstack/react-query";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    staleTime: 0,
    gcTime: 0,
    queryFn: fetchUserProfile,
  });
};
